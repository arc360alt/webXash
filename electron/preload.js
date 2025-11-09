const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // expose secure APIs for your frontend if needed
});
