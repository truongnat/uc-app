import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { reduxStorage, RootState } from 'store';

export const Method = {
  get: 'GET',
  post: 'POST',
  put: 'PUt',
  patch: 'PATCH',
  delete: 'DELETE',
};

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.API_URL,
  async prepareHeaders(headers, { getState }) {
    const state = getState() as RootState;
    let token = '';
    const tokenStore = state.auth?.token?.accessToken;
    if (tokenStore) {
      token = tokenStore;
    } else {
      token = await reduxStorage.getItem('token');
    }
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
  }
  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
});
