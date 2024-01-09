<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <RouterLink class="logo_wrapper" to="/">
      <v-icon name="io-earth"/>
      Earth App
    </RouterLink>
    <nav>
      <RouterLink to="astronomy-picture-of-the-day">Astronomy picture of the day</RouterLink>
      <RouterLink to="current-location">Current location image</RouterLink>
      <RouterLink to="the-most-recent-enhanced-earth-image">The most recent enhanced Earth image</RouterLink>
    </nav>
  </header>
  <RouterView />
</template>

<style scoped>
  header {
    background-color: #01767d;
    display: flex;
    padding: 1em;
    margin-bottom: 2em;
  }

  .logo_wrapper {
    color: white;
  }

  nav {
    display: flex;
    gap: 1em;
    margin: 0 2em;
  }

  a + a {
    border-left: 1px solid;
    padding-left: 1em;
  }

  nav a {
    opacity: .8;
  }

  nav a:hover {
    opacity: 1;
  }
</style>
