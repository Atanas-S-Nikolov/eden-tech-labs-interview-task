<script setup lang="ts">
import { useFetch } from '@vueuse/core/index.cjs';
import LoadSpinner from './LoadSpinner.vue';
import dayjs from 'dayjs';
import { ref, computed, onUpdated } from 'vue';
import { NASA_URL } from '@/utils/EndpointsUtils';
import { type NasaAPOD } from '@/appTypes/NasaAPOD';
import { isValidDate } from '@/utils/DateUtils';
import DatePicker from './DatePicker.vue';

const date = ref('');
const hasDateError = ref(false);
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
  hasDateError.value = false;
  const value = (event.target as HTMLInputElement).value;
  if (!isValidDate(value)) {
    hasDateError.value = true;
    return;
  }
  date.value = value;
}
</script>

<template>
  <DatePicker v-model:hasError="hasDateError" @change="handleDateChange"/>
  <LoadSpinner v-if="isFetching"/>
  <section v-if="isFinished" class="heading_section">
    <h2 class="title">{{ title }}</h2>
    <h3 class="author">By {{ copyright }}</h3>
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

  @media (max-width: 650px) {
    .heading_section {
      line-height: 1;
    }

    .heading_section, .explanation {
      font-size: medium;
    }
  }
</style>
