export type ApiError = {
  message: string;
  status: number;
};

export type AsyncStatus = "error" | "idle" | "loading" | "success";

export type ThemeMode = "dark" | "light";

export type ThemeTokens = {
  accent: string;
  accentBorder: string;
  accentSoft: string;
  background: string;
  border: string;
  card: string;
  danger: string;
  dangerBorder: string;
  dangerSoft: string;
  heroGradient: readonly [string, string, string];
  inputBackground: string;
  muted: string;
  onAccent: string;
  placeholder: string;
  primaryText: string;
  secondaryText: string;
  surfaceStrong: string;
  tabBar: string;
};
