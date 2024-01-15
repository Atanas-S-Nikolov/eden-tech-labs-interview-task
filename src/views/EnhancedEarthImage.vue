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
const isLoading = ref(false);
const isImageLoaded = ref(false);
const imageSrc = ref('');
const imgDate = ref('');
const caption = ref('');

const {
  isLoading: isAvailableRequestLoading,
  isFinished: isAvailableRequestFinished,
  data: availableRequestData
} = useAxios('EPIC/api/enhanced/available', nasaRequest);

function afterLoadImage() {
  isImageLoaded.value = true;
}

function handleSelectChange(event: Event) {
  const date = (event.target as HTMLSelectElement).value;
  isImageLoaded.value = false;
  isLoading.value = true;
  isFinished.value = false;
  useAxios<Array<NasaEpicEnhancedImage>>(`/EPIC/api/enhanced/date/${date}`, nasaRequest)
  .then(response => {
    const array = response.data.value;
    const theMostRecentImage = array && array[array.length - 1];
    if (theMostRecentImage) {
      const { image, caption: imageCaption } = theMostRecentImage;
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
}
</script>

<template>
  <main>
    <select
      v-if="isAvailableRequestFinished"
      name="available_dates"
      id="available_dates_select"
      @change="handleSelectChange"
    >
      <option v-for="item in availableRequestData" :key="item" :value="item">
        {{ item }}
      </option>
    </select>
    <LoadSpinner v-if="(isLoading || isAvailableRequestLoading) && !isImageLoaded" />
    <p v-if="(isLoading || isAvailableRequestLoading) && !isImageLoaded">Loading...<br/> Please wait</p>
    <img v-if="isFinished" class="main_image" :src="imageSrc" alt="The most recent enhanced Earth image" :onload="afterLoadImage"/>
    <p v-if="isFinished && isImageLoaded">{{ caption }}</p>
    <p v-if="isFinished && isImageLoaded"><b>Date:</b> {{ imgDate }}</p>
  </main>
</template>

<style scoped>
  main {
    display: grid;
    place-items: center;
    text-align: center;
    font-size: x-large;
  }

  #available_dates_select {
    margin-bottom: 2em;
    padding: .5em 1em;
    font-size: large;
  }

  .main_image {
    width: 750px;;
  }

  @media (max-width: 800px) {
    main {
      padding: 0 10%;
    }
  }

  @media (max-width: 450px) {
    main {
      font-size: large;
    }

    #available_dates_select {
      margin-bottom: 2em;
      padding: .5em 1em;
      font-size: medium;
    }
  }
</style>
