<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import AppLayout from '@/layouts/AppLayout.vue';
import SimpleLayout from '@/layouts/SimpleLayout.vue';
import SvgSprites from '@/components/SvgSprites.vue';
import Toast from 'primevue/toast';

defineOptions({
  components: {
    AppLayout,
    SimpleLayout,
  },
});

const layout = ref('AppLayout');
const route = useRoute();

watch(
  () => route.meta,
  (meta) => {
    layout.value = meta.layout ?? 'AppLayout';
  },
);
</script>

<template>
  <Toast position="top-right" />
  <component :is="layout" />
  <SvgSprites />
</template>
