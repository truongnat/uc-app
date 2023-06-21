import { User } from '../users/types';

export type LoginFromPayload = {
  username: string;
  password: string;
};

export type RegisterFormPayload = LoginFromPayload;

export type LoginResponse = {
  user: User;
  token: {
    expiresIn: number;
    accessToken: string;
  };
};
