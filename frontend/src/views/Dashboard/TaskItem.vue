<script setup lang="ts">
import type { ApiSchema } from '@/types';

const TASK_STATUS: Record<string, string> = {
  pending: 'Pending',
  completed: 'Completed',
  cancelled: 'Cancelled',
  review_required: 'Review required',
};

const props = defineProps<{
  task: ApiSchema['BrokerTask'];
}>();

const isUploadVisible = (status: string) => {
  return status !== 'completed' && status !== 'cancelled';
};
</script>

<template>
  <tr class="task">
    <td class="task__id">{{ props.task.id }}</td>
    <td class="task__title">
      {{ props.task.title }}
    </td>
    <td class="task__status">
      {{ TASK_STATUS[props.task.status] }}
    </td>
    <td>
      <BButton v-if="isUploadVisible(props.task.status)" label="Upload" icon-pos="right" />
    </td>
  </tr>
</template>

<style lang="scss" scoped>
.task td {
  padding: 0.5rem 0.5rem;
  display: table-cell;
  font-size: $font-md;
  text-align: left;
}
.task td .sm {
  display: none;
}
</style>
