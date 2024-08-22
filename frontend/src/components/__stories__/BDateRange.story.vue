@@ -0,0 +1,54 @@
<script setup lang="ts">
import { ref } from 'vue';
const inputValue = ref({ start: '2023-01-12', end: '2023-02-14' });
</script>

<template>
  <Story title="BDateRange">
    <Variant title="Default">
      <div class="p-2">
        <div class="p-4">
          <BDateRange v-model="inputValue" />
        </div>
        <div class="p-4">
          <BDateRange v-model="inputValue" />
        </div>
        <div class="p-4">
          <BDateRange v-model="inputValue" variant="success" />
        </div>
        <div class="p-4">
          <BDateRange v-model="inputValue" variant="danger" show-button-bar />
        </div>
        <div class="mt-4">
          {{ inputValue }}
        </div>
        <div>{{ typeof inputValue }}</div>
      </div>
    </Variant>
  </Story>
</template>

<style lang="scss" scoped>
.grid {
  display: grid;
  gap: 2rem;

  margin: 2rem;
}
</style>
