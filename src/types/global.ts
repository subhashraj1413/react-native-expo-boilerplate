export type ApiError = {
  message: string;
  status: number;
};

export type AsyncStatus = "error" | "idle" | "loading" | "success";

export type ThemeMode = "dark" | "light";

export type ThemeTokens = {
  accent: string;
  background: string;
  border: string;
  card: string;
  danger: string;
  muted: string;
  primaryText: string;
  secondaryText: string;
};
