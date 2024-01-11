<script setup lang="ts">
import { useAxios } from '@vueuse/integrations/useAxios'
import nasaRequest from '@/utils/nasa';
import { NASA_EPIC_URL } from '@/utils/EndpointsUtils';
import LoadSpinner from '@/components/LoadSpinner.vue';
import { ref } from 'vue';
import { type NasaEpicEnhancedImage } from '@/appTypes/NasaEpicEnhancedImage';
import dayjs from 'dayjs';
import { formatMonthOrDay } from '@/utils/DateUtils';

const IMAGE_TYPE = 'png'; 

const isFinished = ref(false);
const isLoading = ref(true);
const imageSrc = ref('');
const imgDate = ref('');
const caption = ref('');

useAxios<Array<NasaEpicEnhancedImage>>('/EPIC/api/enhanced', nasaRequest)
  .then(response => {
    const array = response.data.value;
    const theMostRecentImage = array && array[array.length - 1];
    if (theMostRecentImage) {
      const { image, date, caption: imageCaption } = theMostRecentImage;
      const imageDate = dayjs(date);
      const year = imageDate.year();
      const month = formatMonthOrDay(imageDate.month() + 1);
      const day = formatMonthOrDay(imageDate.date());
      const fileName = `${image}.${IMAGE_TYPE}`;
      imageSrc.value = `${NASA_EPIC_URL}/archive/enhanced/${year}/${month}/${day}/${IMAGE_TYPE}/${fileName}`;
      imgDate.value = imageDate.format('YYYY-MM-DD');
      caption.value = imageCaption;
      isFinished.value = true;
      isLoading.value = false;
    }
  })
</script>

<template>
  <section>
    <LoadSpinner v-if="isLoading" />
    <p v-if="isLoading">Loading...<br/> Please wait</p>
    <img v-if="isFinished" class="main_image" :src="imageSrc" alt="The most recent enhanced Earth image" />
    <p v-if="isFinished">{{ caption }}</p>
    <p v-if="isFinished"><b>Date:</b> {{ imgDate }}</p>
  </section>
</template>

<style scoped>
  section {
    display: grid;
    place-items: center;
    text-align: center;
    font-size: x-large;
  }

  .main_image {
    width: 750px;;
  }
</style>
