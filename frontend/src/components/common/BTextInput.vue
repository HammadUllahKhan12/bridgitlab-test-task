<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import InputText from 'primevue/inputtext';
import type { ClassType, VariantType } from '@/types';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<{
    modelValue?: string | number;
    class?: string | ClassType | ClassType[];
    variant?: VariantType | string;
    icon?: string;
    readonly?: boolean;
    disabled?: boolean;
  }>(),
  {
    modelValue: undefined,
    class: undefined,
    variant: undefined,
    icon: undefined,
    disabled: false,
    readonly: false,
  },
);

const emit = defineEmits<{
  (e: 'update:modelValue', v?: string): void;
}>();

const inputValue = ref<string>();

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
  (val) => (inputValue.value = val?.toString()),
  { immediate: true },
);

watch(inputValue, (val) => {
  emit('update:modelValue', val);
});
</script>

<template>
  <div class="b-textinput" :class="inputClasses">
    <span v-if="props.icon" class="b-textinput__icon">
      <i class="pi" :class="icon"></i>
    </span>
    <InputText v-model="inputValue" :disabled="props.disabled" :readonly="props.readonly" v-bind="$attrs" />
  </div>
</template>

<style lang="scss" scoped>
.b-textinput {
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

  :deep(.p-inputtext) {
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
