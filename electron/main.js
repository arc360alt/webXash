const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    autoHideMenuBar: true,
    frame: false, // Frameless
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  // Load dev server or production build
  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Inject responsive top bar
  mainWindow.webContents.on('did-finish-load', () => {
    // Get absolute paths
    const minimizePath = `file://${path.join(__dirname, 'minimize.png')}`;
    const closePath = `file://${path.join(__dirname, 'close.png')}`;

    mainWindow.webContents.executeJavaScript(`
      const style = document.createElement('style');
      style.innerHTML = \`
        #electron-top-bar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 30px;
          -webkit-app-region: drag;
          background: rgba(0,0,0,0.1);
          z-index: 9999;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          box-sizing: border-box;
          padding-right: 8px;
        }
        #electron-top-bar img {
          width: 20px;
          height: 20px;
          margin-left: 8px;
          -webkit-app-region: no-drag;
          cursor: pointer;
        }
      \`;
      document.head.appendChild(style);

      const bar = document.createElement('div');
      bar.id = 'electron-top-bar';

      const minimizeBtn = document.createElement('img');
      minimizeBtn.src = "${minimizePath}";
      minimizeBtn.id = 'electron-minimize';

      const closeBtn = document.createElement('img');
      closeBtn.src = "${closePath}";
      closeBtn.id = 'electron-close';

      bar.appendChild(minimizeBtn);
      bar.appendChild(closeBtn);
      document.body.appendChild(bar);

      minimizeBtn.addEventListener('click', () => window.electronAPI.minimize());
      closeBtn.addEventListener('click', () => window.electronAPI.close());

      window.addEventListener('resize', () => {
        bar.style.width = window.innerWidth + 'px';
      });
    `);
  });
}

// IPC handlers
ipcMain.on('window-minimize', () => mainWindow?.minimize());
ipcMain.on('window-close', () => mainWindow?.close());

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (!mainWindow) createWindow();
});
