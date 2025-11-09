<template>
  <div class="half window xash-loading" name="Loading">
    <div class="xash-loading__container">
      {{ loadingPercentage }}%
      <div class="loading-bar-container">
        <div
          v-for="n in maxBlocks"
          :key="n"
          :class="['loading-block', { filled: n <= loadingProgress }]"
        ></div>
      </div>
    </div>
    <p>This may take a while.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

// Reactive local variables
const loadingProgress = ref(0);
const maxBlocks = ref(15); // number of large blocks

const loadingPercentage = computed(() => {
  return Math.round((loadingProgress.value / maxBlocks.value) * 100);
});

let interval: number;

onMounted(() => {
  interval = window.setInterval(() => {
    if (loadingProgress.value < maxBlocks.value) {
      // Increment 1 randomly to simulate "slow random fill"
      loadingProgress.value += 1;
    } else {
      clearInterval(interval); // stop at max
    }
  }, 1); // slower increments for visible progress
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<style scoped lang="scss">
.xash-loading {
  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .loading-bar-container {
    display: flex;
    gap: 4px;
    margin-top: 12px;
    width: 90%;
    padding: 4px;
    background-color: #080808;
    border-top: solid 1px #323232;
    border-bottom: solid 1px #080808;
    border-left: solid 1px #323232;
    border-right: solid 1px #080808;
    box-sizing: border-box;
  }

  .loading-block {
    flex: 1;
    height: 24px; /* large block height */
    background-color: rgba(255, 255, 255, 0.2); /* background block color */
    border-top: solid 1px #323232;
    border-bottom: solid 1px #080808;
    border-left: solid 1px #323232;
    border-right: solid 1px #080808;
    box-sizing: border-box;
    transition: background-color 0.2s;
  }

  .loading-block.filled {
    background-color: white; /* filled blocks */
  }
}

p {
  margin-top: 10px;
  color: white;
}
</style>
