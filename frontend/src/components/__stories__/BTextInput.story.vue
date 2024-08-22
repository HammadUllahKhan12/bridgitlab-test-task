@@ -0,0 +1,54 @@
<script setup lang="ts">
import { reactive, ref } from 'vue';

type IconVariant = 'dollar' | 'percentage';

const inputValue = ref();

const state = reactive({
  icon: undefined as IconVariant | undefined,
  label: 'Click me',
  disabled: false,
  loading: false,
});
</script>

<template>
  <Story title="BTextInput">
    <Variant title="Default">
      <div class="p-2">
        <div class="p-4">
          <BTextInput v-model="inputValue" :icon="state.icon" />
        </div>
        <div class="p-4">
          <BTextInput v-model="inputValue" :icon="state.icon" />
        </div>
        <div class="p-4">
          <BTextInput v-model="inputValue" :icon="state.icon" variant="success" />
        </div>
        <div class="p-4">
          <BTextInput v-model="inputValue" :icon="state.icon" variant="danger" />
        </div>
        <div class="mt-4">
          {{ inputValue }}
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
