<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import PvCalendar from 'primevue/calendar';
import type { ClassType, VariantType } from '@/types';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<{
    modelValue?: string | null;
    class?: string | ClassType | ClassType[];
    variant?: VariantType;
    placeholder?: string;
    readonly?: boolean;
    disabled?: boolean;
  }>(),
  {
    modelValue: undefined,
    class: undefined,
    variant: undefined,
    placeholder: 'DD/MM/YYYY',
    disabled: false,
    readonly: false,
  },
);

const emit = defineEmits<{
  (e: 'update:modelValue', v: string | null): void;
}>();

const dateValue = ref<Date>();

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

const calendarRef = ref();
const openCalendar = () => {
  if (calendarRef.value) {
    calendarRef.value.overlayVisible = true;
  }
};

watch(
  () => props.modelValue,
  (val) => {
    dateValue.value = val ? new Date(val) : undefined;
  },
  { immediate: true },
);

watch(dateValue, (val) => {
  emit('update:modelValue', val?.toISOString() ?? null);
});
</script>

<template>
  <div class="b-datepicker" :class="inputClasses">
    <span class="b-datepicker__icon" @click="openCalendar()">
      <i class="pi pi-calendar"></i>
    </span>
    <PvCalendar
      ref="calendarRef"
      v-model="dateValue"
      date-format="dd/mm/yy"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :readonly="props.readonly"
      v-bind="$attrs"
    />
  </div>
</template>

<style lang="scss" scoped>
.b-datepicker {
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

  :deep(.p-calendar) {
    width: 100%;
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
