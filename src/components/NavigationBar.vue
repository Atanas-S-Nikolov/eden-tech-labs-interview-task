<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router'

const GI_HAMBURGER_MENU = 'gi-hamburger-menu'; 
const IO_CLOSE = 'io-close'; 
const menuIcon = ref(GI_HAMBURGER_MENU);

const isMobileNavOpen = ref(false);

function handleMenuButtonClick() {
  const navEl = document.getElementsByTagName('nav')[0];
  if (isMobileNavOpen.value) {
    isMobileNavOpen.value = false;
    menuIcon.value = GI_HAMBURGER_MENU;
    navEl.classList.remove('visible');
    return;
  }

  isMobileNavOpen.value = true;
  menuIcon.value = IO_CLOSE;
  navEl.classList.add('visible');
}
</script>

<template>
  <header>
    <RouterLink class="logo_wrapper" to="/">
      <v-icon name="io-earth"/>
      Astronomy App
    </RouterLink>
    <nav>
      <RouterLink to="astronomy-picture-of-the-day">Astronomy picture of the day</RouterLink>
      <RouterLink to="current-location">Current location image</RouterLink>
      <RouterLink to="the-most-recent-enhanced-earth-image">The most recent enhanced Earth image</RouterLink>
    </nav>
    <span class="menu_icon_wrapper" @click.prevent="handleMenuButtonClick">
      <v-icon class="menu_icon" :name="menuIcon" scale="1.3"/>
    </span>
  </header>
  <RouterView />
</template>

<style scoped>
  header {
    background-color: var(--main-color);
    display: flex;
    padding: 1em;
    margin-bottom: 2em;
  }

  .logo_wrapper, .menu_icon_wrapper {
    color: white;
  }

  .menu_icon_wrapper {
    position: absolute;
    top: 0;
    right: 0;
    margin-right: 1em;
    padding: 1em;
    border-radius: 10px;
    display: none;
  }

  .menu_icon_wrapper:hover {
    cursor: pointer;
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

  .visible {
    visibility: visible;
  }

  @media (max-width: 1200px) {
    nav {
      visibility: hidden;
      flex-direction: column;
      position: absolute;
      right: 0;
      margin: 0;
      margin-top: 2.3em;
      background-color: white;
      box-shadow: 0px 5px 10px lightgray;
      z-index: 2;
    }

    nav a {
      color: black;
    }

    a + a {
      border: none;
      padding: 0;
    }

    .menu_icon_wrapper {
      display: block;
    }
  }
</style>
