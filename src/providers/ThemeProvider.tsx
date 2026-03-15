import { createContext, useMemo, useState, type PropsWithChildren } from "react";
import { themes } from "../theme";
import type { ThemeMode, ThemeTokens } from "../types/global";

type ThemeContextValue = {
  mode: ThemeMode;
  theme: ThemeTokens;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextValue>({
  mode: "dark",
  theme: themes.dark,
  toggleTheme: () => undefined,
});

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [mode, setMode] = useState<ThemeMode>("dark");

  const value = useMemo(
    () => ({
      mode,
      theme: themes[mode],
      toggleTheme: () => {
        setMode((current) => (current === "dark" ? "light" : "dark"));
      },
    }),
    [mode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
