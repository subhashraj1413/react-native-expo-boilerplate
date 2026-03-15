import {
  createContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { useColorScheme } from "react-native";
import { themeStorage } from "../lib/storage/mmkv";
import { themes } from "../theme";
import type { ThemeMode, ThemeTokens } from "../types/global";

export type ThemeContextValue = {
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
  const systemMode = useColorScheme() === "light" ? "light" : "dark";
  const [mode, setMode] = useState<ThemeMode>(() => {
    return themeStorage.read() ?? systemMode;
  });

  useEffect(() => {
    if (!themeStorage.read()) {
      setMode(systemMode);
    }
  }, [systemMode]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      theme: themes[mode],
      toggleTheme: () => {
        setMode((current) => {
          const next = current === "dark" ? "light" : "dark";
          themeStorage.write(next);
          return next;
        });
      },
    }),
    [mode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
