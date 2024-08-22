<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useTemplateRefsList } from '@vueuse/core';
import type { TabOption } from '@/types';

type TabItem = TabOption | string;

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    tabs?: TabItem[];
  }>(),
  {
    modelValue: undefined,
    tabs: () => [],
  },
);

const emit = defineEmits(['update:modelValue']);

const tabItems = computed(() => props.tabs.map((tab) => (typeof tab === 'string' ? { id: tab, caption: tab } : tab)));
const tabRefs = useTemplateRefsList<HTMLButtonElement>();
const sliderStyle = ref();
const setSelected = (id: string | undefined) => {
  const index = tabItems.value.findIndex((t) => t.id == id);
  if (index >= 0) {
    const first = tabRefs.value[0].getBoundingClientRect();
    const rect = tabRefs.value[index].getBoundingClientRect();
    sliderStyle.value = { left: `${rect.x - first.x}px`, width: `${rect.width}px` };
    emit('update:modelValue', tabItems.value[index].id);
  }
};
const gotoTab = (index: number) => {
  const tabIndex = index < 0 ? tabRefs.value.length - 1 : index === tabRefs.value.length ? 0 : index;
  tabRefs.value[tabIndex].focus();
};

watch(
  () => props.modelValue,
  (id) => setSelected(id),
);
watch(tabItems, () => setSelected(props.modelValue), { immediate: true, deep: true, flush: 'post' });
</script>

<template>
  <div class="b-tabs">
    <button
      v-for="(tab, index) in tabItems"
      :key="tab.id"
      :ref="tabRefs.set"
      class="b-tabs__item"
      :class="{ 'b-tabs--selected': tab.id === props.modelValue }"
      @click="tab.id !== props.modelValue && setSelected(tab.id)"
      @keydown.left="gotoTab(index - 1)"
      @keydown.right="gotoTab(index + 1)"
    >
      <slot :tab="tab">
        <BSvgIcon v-if="tab.icon" :name="tab.icon" />
        {{ tab.caption }}
      </slot>
    </button>
    <div class="b-tabs__slider" :style="sliderStyle" />
  </div>
</template>

<style lang="scss" scoped>
:global(:root) {
  --tab-text-color: #{color(blue-800)};
}

.b-tabs {
  position: relative;

  display: flex;

  border-bottom: 2px solid color(grey-200);

  &__item {
    z-index: 1;

    display: inline-flex;
    gap: 0 0.5rem;
    align-items: center;

    padding: 0.75rem 0.5rem;

    color: var(--tab-text-color);
    font-weight: $font-weight-normal;
    font-size: $font-xl;
    font-family: Gordita, sans-serif;

    border: 0;

    background-color: transparent;

    transition: color 0.2s ease-out;

    & + & {
      margin-left: 1rem;
    }
  }

  &__slider {
    position: absolute;
    left: 0;
    bottom: -2px;

    width: 0;
    height: 0.25rem;

    background-color: color(green-500);

    transition: all 0.2s ease-out;
  }

  &--selected {
    --tab-text-color: #{color(green-600)};
    font-weight: $font-weight-semi;
  }
}
</style>
