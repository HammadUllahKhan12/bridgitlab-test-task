@@ -0,0 +1,54 @@
<script setup lang="ts">
import { reactive, ref } from 'vue';

const inputValue = ref();

const state = reactive({
  disabled: false,
  loading: false,
});
</script>

<template>
  <Story title="BTextarea">
    <Variant title="Default">
      <div class="p-2">
        <div class="p-4">
          <BTextarea v-model="inputValue" :disabled="state.disabled" />
        </div>
        <div class="p-4">
          <BTextarea v-model="inputValue" />
        </div>
        <div class="p-4">
          <BTextarea v-model="inputValue" variant="success" />
        </div>
        <div class="p-4">
          <BTextarea v-model="inputValue" variant="danger" />
        </div>
        <div class="mt-4">
          <pre>
            {{ inputValue }}
          </pre>
        </div>
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
