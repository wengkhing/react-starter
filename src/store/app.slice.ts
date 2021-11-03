import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoadingConfig } from '../helper/api';

type LoadingPayload = LoadingConfig;
interface SetErrorPayload {
  requestKey: string;
  error: Error;
}

interface ClearErrorPayload {
  requestKey: string;
}

interface AppState {
  loadStack: string[];
  intLoadStack: string[];
  error: Record<string, Error>;
}

const initialState = {
  loadStack: [],
  intLoadStack: [],
  error: {},
} as AppState;

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    startLoading: (state, action: PayloadAction<LoadingPayload>) => {
      const { requestKey, isInterruptive } = action.payload;
      state[isInterruptive ? 'intLoadStack' : 'loadStack'].push(requestKey);
    },
    endLoading: (state, action: PayloadAction<LoadingPayload>) => {
      const { requestKey, isInterruptive } = action.payload;
      const stack = isInterruptive ? 'intLoadStack' : 'loadStack';
      state[stack] = state[stack].filter((key) => key !== requestKey);
    },
    setError: (state, action: PayloadAction<SetErrorPayload>) => {
      const { requestKey, error } = action.payload;
      state.error = {
        ...state.error,
        [requestKey]: error,
      };
    },
    clearError: (state, action: PayloadAction<ClearErrorPayload>) => {
      delete state.error[action.payload.requestKey];
    },
  },
});

export const { startLoading, endLoading, setError, clearError } =
  appSlice.actions;

export default appSlice.reducer;
