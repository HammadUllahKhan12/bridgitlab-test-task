<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import InputNumber from 'primevue/inputnumber';
import type { ClassType, NumberIcon, VariantType } from '@/types';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<{
    modelValue?: number | undefined;
    class?: string | ClassType | ClassType[];
    variant?: VariantType | string;
    icon?: NumberIcon;
    decimal?: number;
    readonly?: boolean;
    disabled?: boolean;
  }>(),
  {
    modelValue: undefined,
    class: undefined,
    variant: undefined,
    icon: undefined,
    decimal: 2,
    disabled: false,
    readonly: false,
  },
);

const emit = defineEmits<{
  (e: 'update:modelValue', v?: number): void;
}>();

const inputValue = ref<number>();

const inputClasses = computed(() => {
  const classes = [
    {
      'is-disabled': props.disabled,
      'is-readonly': props.readonly,
    },
    props.variant && `is-${props.variant}`,
  ];
  return Array.isArray(props.class) ? [...props.class, ...classes] : [props.class, ...classes];
});

watch(
  () => props.modelValue,
  (val) => (inputValue.value = val),
  { immediate: true },
);

watch(inputValue, (val) => {
  emit('update:modelValue', val);
});
</script>

<template>
  <div class="b-numberinput" :class="inputClasses">
    <span v-if="props.icon" class="b-numberinput__icon">
      <i class="pi" :class="props.icon === 'dollar' ? 'pi-dollar' : 'pi-percentage'"></i>
    </span>
    <InputNumber
      v-model="inputValue"
      :min-fraction-digits="props.decimal"
      :max-fraction-digits="props.decimal"
      :disabled="props.disabled"
      :readonly="props.readonly"
      v-bind="$attrs"
    />
  </div>
</template>

<style lang="scss" scoped>
.b-numberinput {
  display: inline-flex;
  align-items: stretch;

  width: 100%;
  min-height: $input-height;

  color: var(--input-text);

  border: 1px solid var(--input-border);
  border-radius: $border-radius-sm;

  background-color: var(--input-bg);

  overflow: hidden;

  transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;

  &:focus-within,
  &:hover:not(.is-disabled) {
    border-color: var(--input-border-focus);
  }

  &__icon {
    display: grid;
    place-items: center;

    min-width: 2.5rem;

    color: var(--icon-fg);

    border-right: 1px solid var(--input-border);
    border-left: 1px solid transparent;

    background-color: var(--icon-bg);
  }

  :deep(.p-inputnumber-input) {
    color: var(--input-text);

    border: 0;
    border-left: 1px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;

    background-color: transparent;

    &:focus {
      box-shadow: none;
    }
  }
}
</style>
