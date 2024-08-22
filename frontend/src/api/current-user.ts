import { get } from './_fetch';
import type { ApiSchema } from '@/types';
import type { HttpGetRoute } from './_fetch';
export type BrokerCurrentUserDto = ApiSchema['BrokerCurrentUserDto'];
export type BrokerCurrentUserResponseDto = ApiSchema['BrokerCurrentUserResponseDto'];

export default {
  currentUser: async (): Promise<BrokerCurrentUserDto> => {
    const data = await get<undefined, BrokerCurrentUserResponseDto>(<HttpGetRoute>'/brokers/current-user');
    return data.broker;
  },
};
