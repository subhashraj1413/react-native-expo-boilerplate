import { useContext } from "react";
import { ThemeContext, type ThemeContextValue } from "../providers/ThemeProvider";

export const useTheme = (): ThemeContextValue => {
  return useContext(ThemeContext);
};
