<script setup lang="ts">
import { computed } from 'vue';
import type { MenuOption } from '@/types';

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const menuItems: MenuOption[] = [
  {
    id: 1,
    title: 'Dashboard',
    icon: 'home-alt',
    to: { name: 'Dashboard' },
  },
];

const menu = computed(() => menuItems);

const closeMenu = () => {
  emit('close');
};
</script>

<template>
  <div class="nav-menu">
    <template v-for="menuItem in menu" :key="menuItem.id">
      <RouterLink v-if="menuItem.to" class="nav-menu__item" :to="menuItem.to" @click="closeMenu()">
        <BSvgIcon v-if="menuItem.icon" :name="menuItem.icon" size="1.5rem" />
        {{ menuItem.title }}
      </RouterLink>
      <a v-else class="nav-menu__item" :href="menuItem.url" target="_blank">
        <BSvgIcon v-if="menuItem.icon" :name="menuItem.icon" size="1.5rem" />
        {{ menuItem.title }}
      </a>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.nav-menu {
  flex-grow: 1;

  width: 100%;
  padding: 24px 0;

  overflow-y: auto;

  &__back {
    display: flex;
    align-items: center;

    padding: 8px;

    color: color(grey-300);
    font-weight: 600;
    text-decoration: none;
  }

  &__header {
    display: flex;
    gap: 1rem;
    align-items: center;

    margin-top: 32px;
    padding: 8px;

    color: color(grey-400);
    font-weight: 600;
    font-size: $font-sm;
    text-transform: uppercase;
  }

  &__item {
    display: flex;
    gap: 1rem;
    align-items: center;

    width: 100%;
    padding: 1rem 1rem 1rem 1.5rem;

    font-weight: $font-weight-normal;
    font-size: $font-xl;
    text-decoration: none;

    border-left: 6px solid transparent;

    cursor: default;

    @at-root a#{&}:not(.router-link-exact-active) {
      color: color(grey-400);

      &:hover {
        background-color: color(blue-700);

        cursor: pointer;
      }
    }

    &.router-link-exact-active {
      color: white;
      font-weight: $font-weight-semi;

      border-color: color(green-500);

      background-color: color(blue-900);

      :deep(svg) {
        color: color(green-500);
      }
    }

    & + & {
      margin-top: 8px;
    }
  }

  svg {
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }
}
</style>
