import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from 'store/auth/types';
import { reduxStorage, RootState } from 'store/index';

export const slice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
  } as AuthState,
  reducers: {
    setUser(state, { payload }: PayloadAction<AuthState['user']>) {
      state.user = payload;
    },
    setToken(state, { payload }: PayloadAction<AuthState['token']>) {
      reduxStorage.setItem('token', payload?.accessToken);
      state.token = payload;
    },
    clearUser(state) {
      state.user = null;
    },
    clearToken(state) {
      state.token = null;
    },
  },
});

export const { setUser, setToken, clearUser, clearToken } = slice.actions;
export default slice.reducer;

export const userSelector = (state: RootState) => state.auth.user;
export const tokenSelector = (state: RootState) => state.auth.token;
