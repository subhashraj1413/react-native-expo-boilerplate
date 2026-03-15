import { palette } from "@/constants/colors";

export const darkTheme = {
  accent: palette.aqua,
  accentBorder: "rgba(244,88,102,0.28)",
  accentSoft: "rgba(244,88,102,0.14)",
  background: palette.ink,
  border: "rgba(255,255,255,0.08)",
  card: "rgba(255,255,255,0.05)",
  danger: palette.coral,
  dangerBorder: "rgba(255,138,149,0.24)",
  dangerSoft: "rgba(255,138,149,0.12)",
  heroGradient: ["#521F2B", "#130D11", "#34131D"],
  inputBackground: palette.panel,
  muted: palette.mist,
  onAccent: palette.sand,
  placeholder: "#876C73",
  primaryText: palette.sand,
  secondaryText: "#D8BEC4",
  surfaceStrong: palette.panel,
  tabBar: "rgba(33,21,26,0.96)",
} as const;
