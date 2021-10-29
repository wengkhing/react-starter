import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoadingConfig } from '../helper/api';

interface AppState {
  loadStack: string[];
  intLoadStack: string[];
}

const initialState = {
  loadStack: [],
  intLoadStack: [],
} as AppState;

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    startLoading: (state, action: PayloadAction<LoadingConfig>) => {
      const { requestKey, isInterruptive } = action.payload;
      state[isInterruptive ? 'loadStack' : 'intLoadStack'].push(requestKey);
    },
    endLoading: (state, action: PayloadAction<LoadingConfig>) => {
      const { requestKey, isInterruptive } = action.payload;
      state[isInterruptive ? 'loadStack' : 'intLoadStack'] = state[
        isInterruptive ? 'loadStack' : 'intLoadStack'
      ].filter((key) => key !== requestKey);
    },
  },
});

export const { startLoading, endLoading } = appSlice.actions;
export default appSlice.reducer;
