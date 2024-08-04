import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  access_token: string | null;
  email: string | null;
  error: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  access_token: null,
  email: null,
  error: null,
  isLoading: false,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state, action: PayloadAction<{ email: string; password: string }>) => {
      state.isLoading = true;
      state.error = null;
      state.isAuthenticated = false;
    },
    loginSuccess: (state, action: PayloadAction<{ access_token: string; email: string }>) => {
      state.isLoading = false;
      state.access_token = action.payload.access_token;
      state.email = action.payload.email;
      state.isAuthenticated = true;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    signupRequest: (state, action: PayloadAction<{ email: string; password: string }>) => {
      state.isLoading = true;
      state.error = null;
      state.isAuthenticated = false;
    },
    signupSuccess: (state, action: PayloadAction<{ access_token: string; email: string }>) => {
      state.isLoading = false;
      state.access_token = action.payload.access_token;
      state.email = action.payload.email;
      state.isAuthenticated = true;
    },
    signupFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    logout: (state) => {
      state.access_token = null;
      state.email = null;
      state.error = null;
      state.isAuthenticated = false;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('access_token');
        localStorage.removeItem('email');
      }
    },
    setAuthFromStorage: (state, action: PayloadAction<{ access_token: string | null; email: string | null }>) => {
      state.access_token = action.payload.access_token;
      state.email = action.payload.email;
      state.isAuthenticated = !!action.payload.access_token;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, signupRequest, signupSuccess, signupFailure, logout, setAuthFromStorage } = authSlice.actions;
export default authSlice.reducer;
