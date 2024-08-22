<script setup lang="ts">
import { computed } from 'vue';
import type { ClassType, IconName, VariantType } from '@/types';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<{
  class?: ClassType;
  variant?: VariantType | string;
  icon?: string;
  svg?: IconName;
}>();

const inputClasses = computed(() => {
  const classes = [props.variant && `is-${props.variant}`];
  return Array.isArray(props.class) ? [...props.class, ...classes] : [props.class, ...classes];
});

const slotName = (name: string | number): string => name as string;
</script>

<template>
  <div class="icon-dropdown" :class="inputClasses">
    <span class="icon-dropdown__icon">
      <BSvgIcon v-if="props.svg" :name="props.svg" />
      <i v-if="props.icon" :class="props.icon"></i>
    </span>
    <BDropdown v-bind="$attrs">
      <template v-for="(_, name) in $slots" #[slotName(name)]="slotData">
        <slot :name="name" v-bind="slotData" />
      </template>
    </BDropdown>
  </div>
</template>

<style lang="scss" scoped>
.icon-dropdown {
  display: inline-flex;
  align-items: center;

  border: 1px solid var(--input-border);
  border-radius: $border-radius-sm;

  overflow: hidden;

  &:hover {
    --input-border: var(--input-border-focus);
  }

  &__icon {
    display: grid;
    place-items: center;
    align-self: stretch;

    width: 3.25rem;

    color: var(--icon-fg);
    font-size: 1.5rem;

    border: none;

    background-color: var(--icon-bg);

    .pi {
      font-size: 1.5rem;
    }
  }

  .b-dropdown {
    display: flex;
    align-items: center;

    border: none;
    border-left: 1px solid $color-border;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;

    &:hover {
      border-color: $color-border;
    }
  }
}
</style>
