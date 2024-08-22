<script setup lang="ts">
import { computed } from 'vue';
import type { IconName } from '@/types';

const props = defineProps<{
  name: IconName;
  size?: string;
}>();

const iconSize = computed(() => props.size || '1em');
</script>

<template>
  <svg class="b-icon">
    <use :xlink:href="`#${props.name}`" />
  </svg>
</template>

<style lang="scss" scoped>
.b-icon {
  width: v-bind('iconSize');
  height: v-bind('iconSize');
}
</style>
