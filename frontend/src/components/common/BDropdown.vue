<script setup lang="ts">
import { computed } from 'vue';
import PvDropdown from 'primevue/dropdown';
import type { VariantType } from '@/types';

const props = withDefaults(
  defineProps<{
    options?: unknown[] | Record<string, string>;
    variant?: VariantType;
    placeholder?: string;
    disabled?: boolean;
  }>(),
  {
    options: () => [],
    variant: undefined,
    placeholder: '-select-',
  },
);

const itemOptions = computed(() =>
  Array.isArray(props.options) ? props.options : Object.entries(props.options).map(([id, label]) => ({ id, label })),
);

const optionItemParams = computed(() =>
  !Array.isArray(props.options)
    ? {
        optionValue: 'id',
        optionLabel: 'label',
      }
    : undefined,
);

const inputClasses = computed(() => {
  return [props.variant && `is-${props.variant}`];
});
</script>

<template>
  <PvDropdown
    class="b-dropdown"
    :options="itemOptions"
    :class="inputClasses"
    :placeholder="props.placeholder"
    :disabled="props.disabled"
    v-bind="optionItemParams"
  >
    <template v-if="$slots.value" #value="slotProps">
      <slot name="value" v-bind="slotProps" />
    </template>
    <template v-if="$slots.option" #option="slotProps">
      <slot name="option" v-bind="slotProps" />
    </template>
    <template v-if="$slots.dropdownicon" #dropdownicon="slotProps">
      <slot name="dropdownicon" v-bind="slotProps" />
    </template>
  </PvDropdown>
</template>

<style lang="scss" scoped>
.b-dropdown {
  width: 100%;
  min-height: $input-height;

  border: 1px solid var(--input-border);

  background-color: var(--input-bg);

  box-shadow: none;

  &.p-focus,
  &:hover:not(.p-disabled) {
    border-color: var(--input-border-focus);
  }

  :deep(.p-dropdown-trigger-icon) {
    transition: transform 0.15s linear;
  }

  &.p-overlay-open {
    :deep(.p-dropdown-trigger-icon) {
      transform: rotate(180deg);
    }
  }

  &.p-disabled {
    --input-bg: #{$color-navy-05};
    opacity: 1;

    :deep(.p-dropdown-label) {
      color: $color-navy-50;
    }
  }
}
</style>
