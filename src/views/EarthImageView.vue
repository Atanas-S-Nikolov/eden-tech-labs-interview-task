<script async setup lang="ts">
import LoadSpinner from '@/components/LoadSpinner.vue';
import { ref } from 'vue';
import dayjs from 'dayjs';
import { NASA_URL } from '@/utils/EndpointsUtils';

const isLoading = ref(true);
const isFinished = ref(false);
const imageSrc = ref('');

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
</script>

<template>
  <section>
    <LoadSpinner v-if="isLoading"/>
    <img v-if="isFinished" :src="imageSrc" alt="Current location Earth image"/>
  </section>
</template>

<style scoped>
  section {
    display: grid;
    place-items: center;
  }

  section img {
    width: 750px;
  }
</style>
