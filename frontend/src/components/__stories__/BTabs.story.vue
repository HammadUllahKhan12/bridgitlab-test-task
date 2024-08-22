<script setup lang="ts">
import { ref } from 'vue';

const tabs = ref(['Account overview', 'Payment details', 'Registration']);
const selected = ref('');
</script>

<template>
  <Story title="BTabs">
    <Variant title="default">
      <BTabs v-model="selected" :tabs="tabs"></BTabs>
      <div>Tab selected: {{ selected }}</div>
    </Variant>
  </Story>
</template>
