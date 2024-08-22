@@ -0,0 +1,54 @@
<script setup lang="ts">
import { reactive } from 'vue';

type ButtonVariant = 'delete' | 'link' | 'dark';

const state = reactive({
  variant: undefined as ButtonVariant | undefined,
  label: 'Click me',
  disabled: false,
  loading: false,
});
</script>

<template>
  <Story title="BButton">
    <Variant title="Default">
      <BButton :variant="state.variant" :disabled="state.disabled" :loading="state.loading">
        {{ state.label }}
      </BButton>

      <div class="grid">
        <div>
          <BButton :disabled="state.disabled">Default</BButton>
        </div>
        <div>
          <BButton variant="link" :disabled="state.disabled">Link</BButton>
        </div>
        <div>
          <BButton variant="delete" :disabled="state.disabled">Delete</BButton>
        </div>
        <div>
          <BButton variant="dark" :disabled="state.disabled">Dark</BButton>
        </div>
      </div>
    </Variant>

    <template #controls>
      <HstText v-model="state.label" title="Label" />
      <HstSelect
        :model-value="state.variant ?? 'default'"
        :options="['default', 'link', 'delete', 'dark']"
        title="Variant"
        @update:model-value="state.variant = $event === 'default' ? undefined : $event"
      />
      <HstCheckbox v-model="state.disabled" title="Disabled" />
      <HstCheckbox v-model="state.loading" title="Loading" />
    </template>
  </Story>
</template>

<style lang="scss" scoped>
.grid {
  display: grid;
  gap: 2rem;

  margin: 2rem;
}
</style>
