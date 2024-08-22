<script setup lang="ts">
import { computed } from 'vue';
import PCard from 'primevue/card';

const props = withDefaults(
  defineProps<{
    alignTitle?: 'center' | 'right' | null;
    alignFooter?: 'center' | 'right' | null;
    alignContent?: 'center' | 'right' | null;
  }>(),
  {
    alignTitle: null,
    alignFooter: null,
    alignContent: null,
  },
);

const footerStyle = computed(() =>
  props.alignFooter === 'center' ? 'center' : props.alignFooter === 'right' ? 'flex-end' : null,
);
</script>

<template>
  <PCard class="b-card">
    <template v-if="$slots.header" #header>
      <slot name="header" />
    </template>
    <template v-if="$slots.title" #title>
      <slot name="title" />
    </template>
    <template v-if="$slots.subtitle" #subtitle>
      <slot name="subtitle" />
    </template>
    <template v-if="$slots.default" #content>
      <slot />
    </template>
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </PCard>
</template>

<style lang="scss" scoped>
.b-card {
  color: color(blue-700);

  border-radius: $border-radius;

  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.06);

  :deep(.p-card-body) {
    display: flex;
    flex-direction: column;

    height: 100%;

    .p-card-title,
    .p-card-subtitle {
      text-align: v-bind('$props.alignTitle');
    }

    .p-card-content {
      flex-grow: 1;

      text-align: v-bind('$props.alignContent');
    }

    .p-card-footer {
      display: flex;
      gap: 0.75rem;
      justify-content: v-bind('footerStyle');
    }
  }
}
</style>
