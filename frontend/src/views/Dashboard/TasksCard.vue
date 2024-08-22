<script setup lang="ts">
import TaskItem from './TaskItem.vue';
import type { ApiSchema } from '@/types';

const props = defineProps<{
  tasks: ApiSchema['BrokerTask'][];
}>();
</script>

<template>
  <BCard>
    <template #title>To-dos</template>
    <table class="tasks-table">
      <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Status</th>
        <th></th>
      </tr>
      <TaskItem v-for="task in props.tasks" :key="task.id" :task="task" />
    </table>
  </BCard>
</template>

<style lang="scss" scoped>
.b-card {
  height: 100%;

  @media (max-width: 991px) {
    background-color: transparent;

    box-shadow: none;

    :deep(.p-card-body) {
      padding: 0.5rem 0;
    }

    :deep(.p-card-content) {
      padding: 0;
    }
  }
}

.column-header {
  font-weight: 500;
  font-size: 80%;
}

.tasks-table {
  width: 100%;
}
.tasks-table th {
  text-align: left;
  padding: 0.5rem 0.5rem;
  font-size: $font-md;
  text-align: left;
}
</style>
