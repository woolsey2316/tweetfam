import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { type AuthState } from "../types/auth"
import { type User } from "../types/user"

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
    setLogin: (state, action: PayloadAction<{ user: User, token: string | null }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
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
