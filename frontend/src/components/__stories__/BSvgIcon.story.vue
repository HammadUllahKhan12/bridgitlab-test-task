@@ -0,0 +1,54 @@
<script setup lang="ts">
import { ICON_NAMES } from '@/consts';
import { reactive } from 'vue';
import SvgSprites from '@/components/SvgSprites.vue';
import type { IconName } from '@/types';

const state = reactive({
  name: 'home' as IconName,
  size: '5rem' as string | undefined,
});
</script>

<template>
  <Story title="BSvgIcon">
    <Variant title="Default">
      <div class="grid">
        <div v-for="icon in ICON_NAMES" :key="icon">
          <BSvgIcon :name="icon" :size="state.size" />
        </div>
      </div>
      <SvgSprites />
    </Variant>
    <template #controls>
      <HstSelect :model-value="state.name ?? 'home'" :options="ICON_NAMES" />
    </template>
  </Story>
</template>

<style lang="scss" scoped>
.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;

  margin: 2rem;
}

:global(.l1) {
  color: skyblue;
}

:global(.l2) {
  color: lightgreen;
}
</style>
