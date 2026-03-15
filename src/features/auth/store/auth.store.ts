import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, Session } from "@/features/auth/types/auth.types";

const initialState: AuthState = {
  hydrated: false,
  isAuthenticated: false,
  session: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    finishHydration(state) {
      state.hydrated = true;
    },
    hydrateSession(state, action: PayloadAction<Session | null>) {
      state.hydrated = true;
      state.isAuthenticated = Boolean(action.payload);
      state.session = action.payload;
    },
    setSession(state, action: PayloadAction<Session>) {
      state.hydrated = true;
      state.isAuthenticated = true;
      state.session = action.payload;
    },
    signOut(state) {
      state.hydrated = true;
      state.isAuthenticated = false;
      state.session = null;
    },
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;

export const selectAuthState = (state: { auth: AuthState }) => state.auth;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated;
export const selectIsHydrated = (state: { auth: AuthState }) =>
  state.auth.hydrated;
export const selectSession = (state: { auth: AuthState }) => state.auth.session;
