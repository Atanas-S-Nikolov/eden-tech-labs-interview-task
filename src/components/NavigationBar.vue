<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, RouterView, useRouter } from 'vue-router'

const GI_HAMBURGER_MENU = 'gi-hamburger-menu'; 
const IO_CLOSE = 'io-close';
const routes = [
  {
    id: 1,
    name: 'Astronomy picture of the day',
    to: 'astronomy-picture-of-the-day'
  },
  {
    id: 2,
    name: 'Current location image',
    to: 'current-location'
  },
  {
    id: 3,
    name: 'The most recent enhanced Earth image',
    to: 'the-most-recent-enhanced-earth-image'
  },
]

const menuIcon = ref(GI_HAMBURGER_MENU);
const isMobileNavOpen = ref(false);

const router = useRouter();

function closeMobileNav() {
  const navEl = document.getElementsByTagName('nav')[0];
  isMobileNavOpen.value = false;
  menuIcon.value = GI_HAMBURGER_MENU;
  navEl.classList.remove('visible');
}

function handleMenuButtonClick() {
  const navEl = document.getElementsByTagName('nav')[0];
  if (isMobileNavOpen.value) {
    closeMobileNav();
    return;
  }

  isMobileNavOpen.value = true;
  menuIcon.value = IO_CLOSE;
  navEl.classList.add('visible');
}

async function navigate(to: string) {
  const navigationError = await router.push(to);
  if (!navigationError) {
    closeMobileNav();
  }
}

</script>

<template>
  <header>
    <RouterLink class="logo_wrapper" to="/">
      <v-icon name="io-earth"/>
      Astronomy App
    </RouterLink>
    <nav>
      <span
        v-for="route in routes"
        :key="route.id"
        class="nav_link"
        @click.prevent="navigate(route.to)"
      >
       {{ route.name }}
      </span>
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

  .nav_link + .nav_link {
    border-left: 1px solid;
    padding-left: 1em;
  }

  nav a, .nav_link {
    color: white;
    opacity: .8;
  }

  nav a:hover, .nav_link:hover {
    opacity: 1;
    cursor: pointer;
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

    .nav_link {
      color: black;
    }

    .nav_link + .nav_link {
      border: none;
      padding: 0;
    }

    .menu_icon_wrapper {
      display: block;
    }
  }
</style>
