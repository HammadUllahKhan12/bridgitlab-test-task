<script setup lang="ts">
import { ref } from 'vue';
import type { IconName } from '@/types';

type ProgressStage = {
  id: number;
  caption: string;
  icon: IconName;
};

const props = defineProps<{
  stage: number;
}>();

const stages = ref<ProgressStage[]>([
  { id: 1, caption: 'Application submission', icon: 'status-app-submission' },
  { id: 2, caption: 'Conditional offer', icon: 'status-conditional-offer' },
  { id: 3, caption: 'Supporting documents', icon: 'status-supporting-docs' },
  { id: 4, caption: 'Unconditional offer', icon: 'status-unconditional-offer' },
  { id: 5, caption: 'Loan settlement', icon: 'status-loan-settlement' },
]);

const stageClass = (index: number) => ({
  'stage--completed': index < props.stage,
  'stage--active': index === props.stage,
  'stage--last': index === stages.value.length,
});
</script>

<template>
  <nav class="loan-progress">
    <ol role="list">
      <li v-for="item in stages" :key="item.id" class="stage" :class="stageClass(item.id)">
        <BSvgIcon class="stage__icon" :name="item.icon" />
        <div class="stage__state"><i class="pi pi-check" /></div>
        <div class="stage__caption">{{ item.caption }}</div>
      </li>
    </ol>
  </nav>
  <div>{{ props.stage }}</div>
</template>

<style lang="scss" scoped>
$grey: color(grey-300);
$dark: color(blue-700);
$green: color(green-500);
$blue: #54b7f9;

// $blue: color(blue-400);

.loan-progress {
  width: 100%;

  ol {
    display: flex;

    list-style-type: none;

    overflow: hidden;
  }
}

.stage {
  --base: #{$grey};
  --col1: #{$grey};
  --col2: #{$grey};
  --state-bg: #fff;
  --line-bg: #{$grey};

  display: flex;
  flex: 1 1 20%;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;

  color: var(--base);
  text-align: center;

  &__icon {
    font-size: 2rem;
  }

  &__state {
    position: relative;

    display: grid;
    place-content: center;

    width: 1.5rem;
    height: 1.5rem;

    color: #fff;

    border: 2px solid var(--base);
    border-radius: 50%;

    background-color: var(--state-bg);

    &::before {
      position: absolute;
      top: calc(50% - 1px);
      content: '';
      z-index: -1;

      width: 100vw;
      height: 2px;

      background-color: var(--line-bg);
    }

    :deep(.pi) {
      font-weight: 700;
      font-size: 0.85rem;
    }
  }

  &__caption {
    width: 10ch;

    font-weight: $font-weight-semi;
  }

  &--completed {
    --base: #{$dark};
    --col1: #{$blue};
    --col2: #{$green};
    --state-bg: #{$dark};
    --line-bg: #{$dark};
  }

  &--active {
    --base: #{$green};
    --col1: #{$green};
    --col2: #{$green};
    --state-bg: #{color(green-50)};

    :deep(.pi) {
      color: transparent;
    }
  }

  &--last {
    --line-bg: #fff;
  }
}

:global(.l1) {
  color: var(--col1);
}

:global(.l2) {
  color: var(--col2);
}
</style>
