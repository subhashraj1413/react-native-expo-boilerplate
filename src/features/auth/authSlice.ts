import type { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../../app/createAppSlice";

export type UserProfile = {
  name: string;
  role: string;
  workspace: string;
};

export type AuthState = {
  email: string;
  error: string | null;
  isAuthenticated: boolean;
  profile: UserProfile;
};

export const demoCredentials = {
  email: "ops@orbit.ai",
  password: "launch-ready",
} as const;

const demoProfile: UserProfile = {
  name: "Maya Chen",
  role: "Operations Lead",
  workspace: "Orbit AI Workspace",
};

const initialState: AuthState = {
  email: "",
  error: null,
  isAuthenticated: false,
  profile: demoProfile,
};

export const authSlice = createAppSlice({
  name: "auth",
  initialState,
  reducers: (create) => ({
    signIn: create.reducer(
      (state, action: PayloadAction<{ email: string; password: string }>) => {
        const email = action.payload.email.trim().toLowerCase();
        const password = action.payload.password;

        state.email = email;

        if (
          email === demoCredentials.email &&
          password === demoCredentials.password
        ) {
          state.error = null;
          state.isAuthenticated = true;
          return;
        }

        state.error = `Use ${demoCredentials.email} / ${demoCredentials.password}`;
        state.isAuthenticated = false;
      },
    ),
    clearAuthError: create.reducer((state) => {
      state.error = null;
    }),
    signOut: create.reducer((state) => {
      state.error = null;
      state.isAuthenticated = false;
    }),
  }),
  selectors: {
    selectAuthError: (auth) => auth.error,
    selectEmail: (auth) => auth.email,
    selectIsAuthenticated: (auth) => auth.isAuthenticated,
    selectProfile: (auth) => auth.profile,
  },
});

export const { clearAuthError, signIn, signOut } = authSlice.actions;
export const {
  selectAuthError,
  selectEmail,
  selectIsAuthenticated,
  selectProfile,
} = authSlice.selectors;
