<script setup lang="ts">
import { ref } from 'vue';
import Button from 'primevue/button';

const showSideMenu = ref(false);
</script>

<template>
  <div class="app__layout page-layout">
    <div class="app__header">
      <div class="menu-toggle" :class="{ 'menu-toggle--open': showSideMenu }" @click="showSideMenu = !showSideMenu">
        <div />
      </div>
      <RouterLink class="app__logo" to="/">
        <BSvgIcon class="logo" name="bridgit" />
        <h1>Broker Portal</h1>
      </RouterLink>
    </div>

    <div class="app__sidebar" :class="{ open: showSideMenu }">
      <RouterView v-slot="{ Component }" name="menu">
        <Transition name="fade">
          <component :is="Component" @close="showSideMenu = false" />
        </Transition>
      </RouterView>
    </div>

    <div class="app__content">
      <RouterView v-slot="{ Component }">
        <Transition name="fade">
          <component :is="Component" />
        </Transition>
      </RouterView>
      <div class="menu-overlay" :class="{ 'menu-overlay--show': showSideMenu }" @click="showSideMenu = false"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$width: 24px;
$height: 3px;
$gap: 8px;
$duration: 0.1s;

.page-layout {
  width: 100vw;
  height: 100vh;
}

.app {
  &__layout {
    display: grid;
    grid-template:
      'header  header' 5rem
      'sidebar content' 1fr;
    grid-template-columns: minmax(auto, 100%) 1fr;
    gap: 0;

    background-color: #f1f6fb;

    overflow: hidden;
  }

  &__header {
    grid-area: header;

    z-index: 20;

    display: flex;
    gap: 0 1rem;

    padding: 1rem;

    color: #000;

    background-color: #fff;

    a {
      color: #000;
    }
  }

  &__logo {
    display: flex;
    flex-grow: 1;
    gap: 0.75rem;
    justify-content: center;
    align-items: center;

    text-align: center;
    text-decoration: none;

    .logo {
      width: 110px;
      height: 50px;
      margin-top: 0.5rem;
    }

    h1 {
      flex: 0 1 min-content;

      padding: 0.25rem 0.5rem;

      color: #fff;
      font-weight: 500;
      font-size: 0.875rem;
      line-height: 1.1;
      text-align: left;

      border-radius: 8px;

      background-color: #0c1744;
    }

    @media (min-width: 640px) {
      gap: 1.5rem;

      .logo {
        width: 145px;
        height: 50px;
      }

      h1 {
        flex: 0 0 auto;

        padding: 0.5rem 1rem;

        font-size: 1.5rem;
      }
    }

    @media (min-width: 992px) {
      justify-content: flex-start;

      text-align: left;

      .logo {
        width: 145px;
        height: 50px;
      }

      h1 {
        padding: 0.5rem 1rem;

        font-size: 1.25rem;
      }
    }
  }

  &__header-menu {
    display: flex;
    gap: 8px;
    align-items: center;

    a {
      font-weight: 700;
      text-decoration: none;
    }
  }

  &__sidebar {
    --transition-timing: 0.3s;
    grid-area: sidebar;

    position: relative;
    z-index: 20;

    display: flex;
    flex-direction: column;

    background-color: #0c1744;

    transform: translateX(-100%);

    overflow: hidden;

    transition: 200ms ease;

    &.open {
      transform: translateX(0);
    }
  }

  &__content {
    grid-area: content-start / sidebar-start / content-end / content-end;

    position: relative;

    display: flex;
    flex-direction: column;

    overflow: auto;
  }

  @media (min-width: 640px) {
    &__layout {
      grid-template-columns: minmax(auto, 272px) 1fr;
    }

    &__sidebar {
      position: relative;
    }
  }

  @media (min-width: 992px) {
    &__layout {
      grid-template-columns: 272px 1fr;
    }

    &__sidebar {
      transform: translateX(0);
    }

    &__content {
      grid-area: content;
    }
  }
}

.menu-toggle {
  display: flex;
  align-items: center;
  align-self: stretch;

  cursor: pointer;

  div {
    position: relative;

    width: $width;
    height: $height;
    margin: math.div($gap, 2) 0;
    padding-top: 2px;

    background-color: #000;

    transition: background-color $duration ease-in-out $duration;

    &::before {
      position: absolute;
      top: -$gap;
      content: '';

      width: $width;
      height: $height;

      background-color: #000;

      transform-origin: 0% 0%;

      transition: transform ($duration * 2) ease-in-out;
    }

    &::after {
      position: absolute;
      top: $gap;
      content: '';

      width: $width;
      height: $height;

      background-color: #000;

      transform-origin: 0% 100%;

      transition: transform ($duration * 2) ease-in-out;
    }
  }

  @media (min-width: 992px) {
    display: none;
  }
}

.menu-toggle--open div {
  background-color: transparent;

  transition: background-color $duration ease-in-out;

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
}

.menu-overlay {
  position: fixed;
  inset: 0;
  z-index: -1;

  background-color: transparent;

  transition: none;

  &--show {
    z-index: 10;

    background-color: rgba(0, 0, 0, 0.3);

    transition: background-color 0.15s ease-in;
  }
}
</style>
