import { User } from 'services/modules/users/types';
import { LoginResponse } from 'services/modules/auth/types';

export type AuthState = {
  user: User | undefined | null;
  token: LoginResponse['token'] | undefined | null;
};
