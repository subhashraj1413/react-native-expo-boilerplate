import type { Session } from "../../features/auth/types/auth.types";
import type { ThemeMode } from "../../types/global";

const SESSION_KEY = "orbit-session";
const THEME_KEY = "orbit-theme";
let memorySession = "";
let memoryTheme: ThemeMode | null = null;

const getWebStorage = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage;
};

export const sessionStorage = {
  clear() {
    const webStorage = getWebStorage();
    memorySession = "";

    webStorage?.removeItem(SESSION_KEY);
  },
  read(): Session | null {
    const webStorage = getWebStorage();
    const raw = webStorage?.getItem(SESSION_KEY) ?? memorySession;

    if (!raw) {
      return null;
    }

    try {
      return JSON.parse(raw) as Session;
    } catch {
      return null;
    }
  },
  write(session: Session) {
    const raw = JSON.stringify(session);
    const webStorage = getWebStorage();

    memorySession = raw;
    webStorage?.setItem(SESSION_KEY, raw);
  },
};

export const themeStorage = {
  clear() {
    const webStorage = getWebStorage();
    memoryTheme = null;
    webStorage?.removeItem(THEME_KEY);
  },
  read(): ThemeMode | null {
    const webStorage = getWebStorage();
    const raw = webStorage?.getItem(THEME_KEY) ?? memoryTheme;

    return raw === "dark" || raw === "light" ? raw : null;
  },
  write(mode: ThemeMode) {
    const webStorage = getWebStorage();

    memoryTheme = mode;
    webStorage?.setItem(THEME_KEY, mode);
  },
};
