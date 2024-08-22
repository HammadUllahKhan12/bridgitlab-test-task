<script setup lang="ts">
import { computed } from 'vue';
import PvTextarea from 'primevue/textarea';

const props = withDefaults(
  defineProps<{
    readonly?: boolean;
    disabled?: boolean;
  }>(),
  {
    disabled: false,
    readonly: false,
  },
);

const inputClasses = computed(() => {
  const classes = {
    'is-disabled': props.disabled,
    'is-readonly': props.readonly,
  };
  return classes;
});
</script>

<template>
  <PvTextarea class="b-textarea" :class="inputClasses" :disabled="props.disabled" :readonly="props.readonly" />
</template>

<style lang="scss" scoped>
.b-textarea {
  min-height: 158px;

  color: var(--input-text);

  border: 1px solid var(--input-border);
  border-radius: 0;

  background-color: var(--input-bg);

  box-shadow: none;

  &:focus,
  &:hover:not(:disabled) {
    --input-border: #{$color-border-focus};
  }
}
</style>
