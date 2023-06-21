import { api, Method } from '../../api';
import { SystemConfig } from './types';

export const authApi = api.injectEndpoints({
  endpoints: build => ({
    getSystemConfig: build.query<SystemConfig, null>({
      query: () => ({
        url: '/system-config',
        method: Method.get,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLazyGetSystemConfigQuery } = authApi;
