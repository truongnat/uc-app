import { api, Method } from '../../api';
import { User } from './types';

export const userApi = api.injectEndpoints({
  endpoints: build => ({
    fetchOne: build.query<User, string>({
      query: id => `/users/${id}`,
    }),
    whoami: build.query<User, null>({
      query: () => ({
        url: '/auth/me',
        method: Method.get,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLazyWhoamiQuery } = userApi;
