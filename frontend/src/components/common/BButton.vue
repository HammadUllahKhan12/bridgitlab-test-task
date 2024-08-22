<script setup lang="ts">
import { computed } from 'vue';
import PvButton from 'primevue/button';

const props = defineProps<{
  variant?: 'primary' | 'link' | 'delete' | 'dark';
  type?: 'submit';
}>();

const buttonClasses = computed(() => [props.variant && `btn--${props.variant}`]);
</script>

<template>
  <template v-if="$slots.default">
    <PvButton :class="buttonClasses" :type="type">
      <slot />
    </PvButton>
  </template>
  <PvButton v-else :class="buttonClasses" :type="type" />
</template>

<style lang="scss" scoped>
.p-button {
  --button-fg: #{$color-text};
  --button-bg: #fff;
  --button-bg-hover: #{$color-light-green};
  --button-bg-active: #{$color-green-25};
  --button-border: #{$color-text};
  color: var(--button-fg);
  font-weight: $font-weight-semi;
  font-size: $font-md;

  border-color: var(--button-border);
  border-radius: $border-radius-sm;

  background-color: var(--button-bg);

  box-shadow: none;

  &:hover {
    background: var(--button-bg-hover);
  }

  &:active {
    background-color: var(--button-bg-active);
  }

  &:disabled {
    --button-bg: #{$color-navy-05};
    --button-bg-hover: #{$color-navy-05};
    --button-bg-active: #{$color-navy-05};
    color: $color-navy-25;

    border-color: transparent;

    cursor: not-allowed;

    opacity: 1;
  }

  &.btn--primary {
    --button-bg: #{$color-emerald};
    --button-border: transparent;
    --button-bg-hover: #{darken($color-emerald, 10%)};
    --button-bg-active: #{darken($color-emerald, 15%)};
  }

  &.btn--link {
    --button-bg: transparent;
    --button-border: transparent;
    --button-bg-hover: transparent;
    --button-bg-active: transparent;

    &:hover :deep(.p-button-label) {
      text-decoration: underline;
    }

    &:active {
      transform: translate(2px, 1px);
    }
  }

  &.btn--delete {
    --button-bg-hover: #{$color-pink};
    --button-bg-active: #{darken($color-pink, 10%)};
  }

  &.btn--dark {
    --button-fg: #fff;
    --button-bg: #{$color-navy};
    --button-bg-hover: #{$color-emerald-25};
    --button-border: #fff;

    &:hover {
      --button-fg: #{$color-navy};
    }
  }
}
</style>
