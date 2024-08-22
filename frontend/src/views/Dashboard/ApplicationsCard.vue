<script setup lang="ts">
import ApplicationItem from './ApplicationItem.vue';
import type { ApiSchema } from '@/types';

const props = defineProps<{
  applications: ApiSchema['BrokerApplicationDto'][];
}>();
</script>

<template>
  <BCard>
    <template #title>Applications</template>
    <table class="application-table">
      <tr>
        <th>ID</th>
        <th>Date</th>
        <th>Property details</th>
        <th>Customer details</th>
        <th>Loan stage</th>
      </tr>
      <ApplicationItem v-for="application in props.applications" :key="application.id" :application="application" />
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

.application-table {
  width: 100%;
}
.application-table th {
  text-align: left;
  padding: 0.5rem 0.5rem;
  font-size: $font-md;
  text-align: left;
}
</style>
