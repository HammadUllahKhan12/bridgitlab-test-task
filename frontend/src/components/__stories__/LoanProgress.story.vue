<script setup lang="ts">
import { ref } from 'vue';
import LoanProgress from '@/components/LoanProgress.vue';
import SvgSprites from '@/components/SvgSprites.vue';

const stage = ref(0);
</script>

<template>
  <Story title="LoanProgress">
    <Variant title="default">
      <input v-model="stage" type="number" />
      <LoanProgress :stage="stage" />
      <SvgSprites />
    </Variant>
  </Story>
</template>
