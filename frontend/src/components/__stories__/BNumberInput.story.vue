@@ -0,0 +1,54 @@
<script setup lang="ts">
import { reactive, ref } from 'vue';

type IconVariant = 'dollar' | 'percentage';

const inputValue = ref(12);

const state = reactive({
  icon: 'dollar' as IconVariant | undefined,
  label: 'Click me',
  disabled: false,
  loading: false,
});
</script>

<template>
  <Story title="BNumberInput">
    <Variant title="Default">
      <div class="p-2">
        <div class="p-4">
          <BNumberInput v-model="inputValue" :icon="state.icon" />
        </div>
        <div class="p-4">
          <BNumberInput v-model="inputValue" :icon="state.icon" :min-fraction-digits="2" :max-fraction-digits="2" />
        </div>
        <div class="p-4">
          <BNumberInput
            v-model="inputValue"
            :icon="state.icon"
            :min-fraction-digits="2"
            :max-fraction-digits="2"
            variant="success"
          />
        </div>
        <div class="p-4">
          <BNumberInput
            v-model="inputValue"
            :icon="state.icon"
            :min-fraction-digits="2"
            :max-fraction-digits="2"
            variant="danger"
          />
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
