<script setup lang="ts">
import { formatDate } from '@/services/formatHelper';
import type { ApiSchema } from '@/types';

const LOAN_STATUS_DESC: Record<string, string> = {
  submitted: 'Application under review',
  under_review: 'Under review',
  cancelled: 'Cancelled',
  funded: 'Funded',
  repaid: 'Repaid',
};

const props = defineProps<{
  application: ApiSchema['BrokerApplicationDto'];
}>();
</script>

<template>
  <tr class="application">
    <td class="application__id">{{ props.application.applicationId }}</td>
    <td class="application__date">
      <div class="sm">Date</div>
      {{ formatDate(props.application.createdAt) }}
    </td>
    <td class="application__properties">
      <div class="sm">Property details</div>
      <div>
        {{ props.application.incomingAddress }}
      </div>
      <div>
        {{ props.application.outgoingAddress }}
      </div>
    </td>
    <td class="application__applicants">
      <div class="sm">Customer details</div>
      {{ props.application.applicantName }}
    </td>
    <td class="application__status">
      <div class="sm">Loan stage</div>
      {{ LOAN_STATUS_DESC[props.application.status] ?? props.application.status }}
    </td>
  </tr>
</template>

<style lang="scss" scoped>
.application td {
  padding: 0.5rem 0.5rem;
  display: table-cell;
  font-size: $font-md;
  text-align: left;
}
.application td .sm {
  display: none;
}
</style>
