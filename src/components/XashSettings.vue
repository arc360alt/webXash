<template>
  <div class="xash-settings">
    <div v-if="!loading">
      <XashGames />
      <XashZips v-if="selectedGame.name === GAME_SETTINGS.HL.name" />
      <XashLoadDirectory />
      <XashLoadZip />
      <XashLaunchOptions />
      <XashStart />
      <Info />
      <Warnings />
      <Attribution />
    </div>
    <XashLoading v-if="loading" />
  </div>
</template>

<script setup lang="ts">
  import { GAME_SETTINGS, useXashStore } from '/@/stores/store';
  import { storeToRefs } from 'pinia';
  import XashZips from './XashZips.vue';
  import XashStart from '/@/components/XashStart.vue';
  import XashLoading from '/@/components/XashLoading.vue';
  import XashLaunchOptions from '/@/components/XashLaunchOptions.vue';
  import Attribution from '/@/components/Attribution.vue';
  import XashLoadZip from '/@/components/XashLoadZip.vue';
  import XashLoadDirectory from '/@/components/XashLoadDirectory.vue';
  import XashGames from '/@/components/XashGames.vue';
  import Info from '/@/components/info.vue';
  import Warnings from '/@/components/Warnings.vue';

  const store = useXashStore();
  const { loading, selectedGame } = storeToRefs(store);
</script>

<style scoped lang="scss">
.xash-settings {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;

  /* Match the natural width of the boxes */
  width: fit-content;
  max-width: 100%;
  height: 100%;

  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: flex-start;
  gap: 10px;

  padding: 10px;
  overflow-y: auto; /* ✅ only this area scrolls */
  overflow-x: hidden;

  /* Optional background if you want it slightly distinct */
  background: transparent;
  z-index: 10;

  /* Inherit your global scrollbar styling */
  scrollbar-width: auto;
  scrollbar-color: inherit;
}


</style>
