import { post } from './_fetch';
import type { ApiSchema } from '@/types';
export type BrokerSignInBodyDto = ApiSchema['BrokerSignInBodyDto'];
export type BrokerSignInResponseDto = ApiSchema['BrokerSignInResponseDto'];

export default {
  signIn: async (body: BrokerSignInBodyDto): Promise<BrokerSignInResponseDto> => {
    const data = await post<undefined, BrokerSignInBodyDto, BrokerSignInResponseDto>(
      '/brokers/sign-in',
      undefined,
      body,
    );
    return data;
  },
};
