import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/index';
import { SystemState } from './types';

export const slice = createSlice({
  name: 'system',
  initialState: {
    config: null,
  } as SystemState,
  reducers: {
    setSystemConfig(state, { payload }: PayloadAction<SystemState['config']>) {
      state.config = payload;
    },
  },
});

export const { setSystemConfig } = slice.actions;
export default slice.reducer;

export const systemConfigSelector = (state: RootState) => state.system.config;
