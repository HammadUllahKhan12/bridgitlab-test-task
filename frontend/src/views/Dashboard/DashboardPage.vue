<script setup lang="ts">
import { api } from '@/api';
import { ref } from 'vue';
import { useToast } from '@/composables/useToast';
import ActionsCard from './ActionsCard.vue';
import ApplicationsCard from './ApplicationsCard.vue';
import TasksCard from './TasksCard.vue';
import type { ApiSchema } from '@/types';
import type { components } from '@/types/schemas/api';

const toast = useToast();
const applications = ref<ApiSchema['BrokerApplicationDto'][]>([]);
const tasks = ref<ApiSchema['BrokerTask'][]>([]);

const loadApplications = async () => {
  const activeStatus: components["schemas"]["ApplicationActiveStatus"] = ['submitted', 'under_review', 'funded'];

  const result = await api.applications.list({ status: activeStatus });

  if (result.success) {
    applications.value = result.applications;
  } else {
    toast.error('An error occurred');
  }
};
const loadTasks = async () => {
  const result = await api.tasks.list();
  if (result.success) {
    tasks.value = result.tasks;
  } else {
    toast.error('An error occurred');
  }
};

loadApplications();
loadTasks();
</script>

<template>
  <div class="dashboard">
    <div class="dashboard__applications">
      <ApplicationsCard :applications="applications" />
    </div>
    <div class="dashboard__actions">
      <ActionsCard />
    </div>
    <div class="dashboard__tasks">
      <TasksCard :tasks="tasks" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dashboard {
  display: grid;
  grid-template-areas:
    'applications'
    'actions'
    'tasks';
  grid-template-columns: 1fr;
  gap: 0.5rem;
  align-items: center;

  width: 100%;
  padding: 0.5rem;

  &__applications {
    grid-area: applications;
  }

  &__actions {
    grid-area: actions;
  }

  &__tasks {
    grid-area: tasks;

    align-self: stretch;
  }

  @media (min-width: 992px) {
    grid-template:
      'applications tasks' auto
      'actions      tasks' auto
      / 2fr 1.5fr;
    gap: 1rem;

    padding: 1rem;
  }
}
</style>
