import { Method, api } from '../../api';
import { User } from '../users/types';
import { LoginFromPayload, LoginResponse, RegisterFormPayload } from './types';

export const authApi = api.injectEndpoints({
  endpoints: build => ({
    login: build.mutation<LoginResponse, LoginFromPayload>({
      query: body => ({
        url: '/auth/login',
        body,
        method: Method.post,
      }),
    }),
    register: build.mutation<User, RegisterFormPayload>({
      query: body => ({
        url: '/auth/register',
        body,
        method: Method.post,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useRegisterMutation } = authApi;
