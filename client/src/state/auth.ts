import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { type AuthState } from "../types/auth.js"
import { type User } from "../types/user.js"

const initialState = {
  isAuthenticated: false,
  user: null, // Stores user object upon login
  token: null, // JWT or Session Token
  loading: false,
  error: null
} satisfies AuthState as AuthState;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<{ token: string | null }>) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      // Also persist token to localStorage for immediate access
      if (action.payload.token) {
        localStorage.setItem('token', action.payload.token);
      }
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      // Clear tokens from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
    },
    setLoading: (state, action: PayloadAction<{ loading: boolean }>) => {
      state.loading = action.payload.loading;
    },
    setError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error;
    }
  }
})

export const { setLogin, setLogout } = authSlice.actions
export default authSlice.reducer
