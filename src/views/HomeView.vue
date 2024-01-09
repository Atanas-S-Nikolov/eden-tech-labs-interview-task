<script setup lang="ts">
  
</script>

<template>
  <main>
    <img src="../assets/earth-icon.svg" alt="Earth"/>
    <section class="title_section">
      <h1>Earth App</h1>
      <h2>View Earth images every day.</h2>
    </section>
  </main>
</template>

<style scoped>
  main {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }

  img {
    width: 450px;
  }

  .title_section {
    line-height: .6;
  }

  .title_section h2 {
    color: gray;
  }
</style>
