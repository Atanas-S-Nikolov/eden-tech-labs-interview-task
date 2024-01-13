<script async setup lang="ts">
import LoadSpinner from '@/components/LoadSpinner.vue';
import { onUnmounted, onUpdated, ref } from 'vue';
import dayjs from 'dayjs';
import { NASA_URL } from '@/utils/EndpointsUtils';
import panzoom from 'panzoom';

const isLoading = ref(true);
const isFinished = ref(false);
const imageSrc = ref('');
const isImageLoaded = ref(false);
const panzoomInstance = ref();
const isPanzoomExitHintVisible = ref(false);

function afterLoadImage() {
  isImageLoaded.value = true;
}

function success(position: GeolocationPosition) {
  const { latitude, longitude } = position.coords;
  
  const url = NASA_URL + '/planetary/earth/imagery';
  const params = new URLSearchParams({
    lat: latitude.toFixed(2),
    lon: longitude.toFixed(2),
    date: dayjs('2018-08-08').format('YYYY-MM-DD'),
    dim: '0.075',
    api_key: import.meta.env.VITE_NASA_API_KEY
  });

  imageSrc.value = `${url}?${params}`;
  isLoading.value = false;
  isFinished.value = true;
}

function error(err: GeolocationPositionError) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error);

function displayOverlay() {
  const overlay = document.getElementById('overlay');
  if (overlay) {
    overlay.classList.remove('hidden-el');
    isPanzoomExitHintVisible.value = true;
  }
}

function hideOverlay(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    const overlay = document.getElementById('overlay');
    if (overlay) {
      overlay.classList.add('hidden-el');
      isPanzoomExitHintVisible.value = false;
      const sceneEl = document.getElementById('scene');
      if (sceneEl) {
        panzoomInstance.value = panzoom(sceneEl, {
          maxZoom: 3,
          minZoom: 0.1,
          beforeWheel: (event: WheelEvent) => {
            const altIsPressed = event.altKey;
            if (altIsPressed) {
              displayOverlay();
            }
            return !altIsPressed
          },
          beforeMouseDown: (event: MouseEvent) => {
            const altIsPressed = event.altKey;
            if (altIsPressed) {
              displayOverlay();
            }
            return !altIsPressed
          },
          zoomDoubleClickSpeed: 1,
        })
      }
    }
  }
}

onUpdated(() => {
  document.addEventListener('keydown', hideOverlay);
  if (isFinished.value) {
    const sceneEl = document.getElementById('scene');
    if (sceneEl) {
      panzoomInstance.value = panzoom(sceneEl, {
        maxZoom: 3,
        minZoom: 0.1,
        beforeWheel: (event: WheelEvent) => {
          const altIsPressed = event.altKey;
          if (altIsPressed) {
            displayOverlay();
          }
          return !altIsPressed
        },
        beforeMouseDown: (event: MouseEvent) => {
          const altIsPressed = event.altKey;
          if (altIsPressed) {
            displayOverlay();
          }
          return !altIsPressed
        },
        zoomDoubleClickSpeed: 1,
      })
    }
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', hideOverlay);
})
</script>

<template>
  <main>
    <LoadSpinner v-if="isLoading && !isImageLoaded"/>
    <div id="panzoom_area" tabindex="0">
      <img v-if="isFinished" id="scene" :src="imageSrc" alt="Current location Earth image" :onload="afterLoadImage" />
    </div>
    <p v-if="isFinished && isImageLoaded && !isPanzoomExitHintVisible">Hold <kbd>'Alt'</kbd> key to pan and/or zoom</p>
    <p v-if="isPanzoomExitHintVisible" id="panzoom_exit_hint">Press <kbd>'Esc'</kbd> key to exit pan and/or zoom</p>
  </main>
</template>

<style scoped>
  main {
    display: grid;
    place-items: center;
  }

  main img {
    width: 750px;
  }

  #panzoom_area {
    z-index: 1;
  }

  #panzoom_exit_hint {
    z-index: 1;
    color: white;
  }
</style>
