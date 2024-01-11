<script setup lang="ts">
import { useAxios } from '@vueuse/integrations/useAxios'
import nasaRequest from '@/utils/nasa';
import LoadSpinner from './LoadSpinner.vue';

const { isLoading, isFinished, data } = useAxios('/planetary/apod', nasaRequest);
</script>

<template>
  <section>
    <LoadSpinner v-if="isLoading"/>
    <section class="heading_section">
      <h2 v-if="isFinished" class="title">{{ data.title }}</h2>
      <h3 v-if="isFinished" class="author">By {{ data.copyright }}</h3>
    </section>
    <img v-if="isFinished" :src="data.url" :alt="data.title"/>
    <p v-if="isFinished" class="explanation">{{ data.explanation }}</p>
  </section>
</template>

<style scoped>
  section {
    display: grid;
    place-items: center;
    text-align: justify;
    padding: 0 15em;
  }

  section img {
    margin: 1em 0;
  }

  .heading_section {
    line-height: .6;
  }

  .author {
    color: var(--main-color);
    opacity: .8;
  }

  .explanation {
    font-size: larger;
  }
</style>
