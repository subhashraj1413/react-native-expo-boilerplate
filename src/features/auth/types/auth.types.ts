export type AuthUser = {
  email: string;
  id: string;
  name: string;
  role: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = LoginPayload & {
  fullName: string;
};

export type ForgotPasswordPayload = {
  email: string;
};

export type Session = {
  token: string;
  user: AuthUser;
};

export type AuthState = {
  hydrated: boolean;
  isAuthenticated: boolean;
  session: Session | null;
};
