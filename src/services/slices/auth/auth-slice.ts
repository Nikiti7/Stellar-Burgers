// src/services/auth/auth-slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

type AuthState = {
  user: TUser | null;
  isAuth: boolean;
  isLoading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  isAuth: false,
  isLoading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authRequest(state) {
      state.isLoading = true;
      state.error = null;
    },
    authSuccess(state, action: PayloadAction<TUser>) {
      state.isLoading = false;
      state.user = action.payload;
      state.isAuth = true;
    },
    authFailed(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuth = false;
    },
    logout(state) {
      state.user = null;
      state.isAuth = false;
    }
  }
});

export const { authRequest, authSuccess, authFailed, logout } =
  authSlice.actions;
export default authSlice.reducer;
