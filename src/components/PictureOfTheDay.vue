<script setup lang="ts">
import { useFetch } from '@vueuse/core/index.cjs';
import LoadSpinner from './LoadSpinner.vue';
import dayjs from 'dayjs';
import { ref, computed, onUpdated } from 'vue';
import { NASA_URL } from '@/utils/EndpointsUtils';
import { type NasaAPOD } from '@/appTypes/NasaAPOD';

const date = ref('');
const url = computed(() => {
  const searchParams = new URLSearchParams({ api_key: import.meta.env.VITE_NASA_API_KEY });
  if (dayjs(date.value).isValid()) {
    searchParams.set('date', date.value);
  }
  return `${NASA_URL}/planetary/apod?${searchParams.toString()}`;  
});

const { isFetching, isFinished, data } = computed(() => useFetch<NasaAPOD>(url, { refetch: true })).value;
const title = ref('');
const copyright = ref('');
const imageSrc = ref('');
const explanation = ref('');
onUpdated(() => {
  // Due to some potentially issues with useFetch or the Nasa APOD API the returned response is string. So parsing is needed.
  let responseData = data.value;
  if (typeof responseData === 'string') {
    responseData = JSON.parse(responseData) as NasaAPOD;
  }
  title.value = responseData?.title || '';
  copyright.value = responseData?.copyright || '';
  imageSrc.value = responseData?.url || '';
  explanation.value = responseData?.explanation || '';
})
function handleDateChange(event: Event) {
  date.value = (event.target as HTMLInputElement).value;
}
</script>

<template>
  <label for="date_picker">Date:</label>
  <input
    type="date"
    id="date_picker"
    name="date-picker"
    @change.prevent="handleDateChange"
  />
  <LoadSpinner v-if="isFetching"/>
  <section class="heading_section">
    <h2 v-if="isFinished" class="title">{{ title }}</h2>
    <h3 v-if="isFinished" class="author">By {{ copyright }}</h3>
  </section>
  <img v-if="isFinished" :src="imageSrc" :alt="title"/>
  <p v-if="isFinished" class="explanation">{{ explanation }}</p>
</template>

<style scoped>
  img {
    margin: 1em 0;
  }

  .heading_section {
    line-height: .6;
    text-align: center;
  }

  .author {
    color: var(--main-color);
    opacity: .8;
  }

  .explanation {
    font-size: larger;
  }
</style>
