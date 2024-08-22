@@ -0,0 +1,54 @@
<script setup lang="ts">
import { ref } from 'vue';
const inputValue = ref('2023-04-12');
</script>

<template>
  <Story title="BDatepicker">
    <Variant title="Default">
      <div class="p-2">
        <div class="p-4">
          <BDatepicker v-model="inputValue" />
        </div>
        <div class="p-4">
          <BDatepicker v-model="inputValue" />
        </div>
        <div class="p-4">
          <BDatepicker v-model="inputValue" variant="success" />
        </div>
        <div class="p-4">
          <BDatepicker v-model="inputValue" variant="danger" />
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
