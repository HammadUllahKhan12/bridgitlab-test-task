<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import PvPanel from 'primevue/panel';

const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    title?: string;
    subtitle?: string;
    border?: boolean;
    noPadding?: boolean;
    toggle?: boolean;
    primary?: boolean;
  }>(),
  {
    modelValue: undefined,
    title: undefined,
    subtitle: undefined,
    border: false,
    noPadding: false,
    toggle: false,
    primary: false,
  },
);

const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean): void;
}>();

const isCollapsed = ref(false);

const panelClasses = computed(() => ({
  'b-panel--open': !isCollapsed.value,
  'b-panel--border': props.border,
  'b-panel--nopadding': props.noPadding,
  'b-panel--primary': props.primary,
}));

const toggleSwitch = () => {
  isCollapsed.value = !isCollapsed.value;
  emit('update:modelValue', !isCollapsed.value);
};

watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen !== undefined) {
      isCollapsed.value = !isOpen;
    }
  },
  { immediate: true },
);
</script>

<template>
  <PvPanel class="b-panel" toggleable :collapsed="isCollapsed" :class="panelClasses">
    <template #header>
      <slot name="header">
        <span v-if="props.title" class="b-panel__title">{{ props.title }}</span>
        <span v-if="props.subtitle" class="b-panel__subtitle">{{ props.subtitle }}</span>
      </slot>
    </template>
    <template #icons>
      <slot name="icons"></slot>
      <button v-if="props.toggle" class="b-panel__toggle p-panel-header-icon" tabindex="-1" @click="toggleSwitch()">
        <span class="b-panel__toggle-icon pi pi-angle-down"></span>
      </button>
    </template>
    <slot />
  </PvPanel>
</template>

<style lang="scss" scoped>
$panel-border-radius: $border-radius;

.b-panel {
  --header-color: #{$color-light-green-50};

  border-radius: $panel-border-radius;

  overflow: hidden;

  &__title {
    font-weight: $font-weight-bold;
    font-size: $font-xl;
  }

  &__subtitle {
    font-weight: $font-weight-bold;
    font-size: $font-lg;
  }

  &__toggle {
    border: 1px solid $color-border-focus;
    border-radius: $border-radius;
  }

  &__toggle-icon {
    transition: transform 0.15s linear;

    .b-panel--open > .p-panel-header > .p-panel-icons > .b-panel__toggle > & {
      transform: rotate(180deg);
    }
  }

  &--primary {
    --header-color: #{$color-light-green};
  }

  &--border {
    filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.3));
  }

  &--nopadding {
    > :deep(.p-toggleable-content > .p-panel-content) {
      padding: 0.25rem 0;
    }
  }

  :deep(.p-panel-header) {
    min-height: 48px;
    padding: 0.5rem 1rem;

    border: 0;
    border-top-left-radius: $panel-border-radius;
    border-top-right-radius: $panel-border-radius;

    background-color: var(--header-color);

    .p-panel-header-icon {
      background-color: transparent;

      &:last-child {
        display: none;
      }

      &:hover {
        background-color: $color-green-25;
      }

      &:focus {
        box-shadow: none;
      }
    }
  }

  :deep(.p-panel-icons) {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  :deep(.p-panel-content) {
    border-bottom-right-radius: $panel-border-radius;
    border-bottom-left-radius: $panel-border-radius;
  }
}
</style>
