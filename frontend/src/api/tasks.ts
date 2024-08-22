import { get, patch } from './_fetch';
import type { ApiSchema } from '@/types';
import type { HttpGetRoute, HttpPatchRoute } from './_fetch';
import type { operations } from '@/types/schemas/api';
export type BrokerTasksListQueryDto = operations['BrokerTasksListController_find']['parameters']['query'];
export type BrokerTasksListResponseDto = ApiSchema['BrokerTasksListResponseDto'];
export type BrokerTasksUpdateQueryDto = operations['BrokerTasksUpdateController_update']['parameters']['query'];
export type BrokerTasksUpdateBodyDto = ApiSchema['BrokerTasksUpdateBodyDto'];
export type BrokerTasksUpdateResponseDto = ApiSchema['BrokerTasksUpdateResponseDto'];

export default {
  list: async (query?: BrokerTasksListQueryDto): Promise<BrokerTasksListResponseDto> => {
    const data = await get<BrokerTasksListQueryDto, BrokerTasksListResponseDto>(
      <HttpGetRoute>'/brokers/tasks/list-tasks',
      query,
    );
    return data;
  },
  update: async (
    query?: BrokerTasksUpdateQueryDto,
    body?: BrokerTasksUpdateBodyDto,
  ): Promise<BrokerTasksUpdateResponseDto> => {
    const data = await patch<BrokerTasksUpdateQueryDto, BrokerTasksUpdateBodyDto, BrokerTasksUpdateResponseDto>(
      <HttpPatchRoute>'/brokers/tasks/update-task',
      query,
      body,
    );
    return data;
  },
};
