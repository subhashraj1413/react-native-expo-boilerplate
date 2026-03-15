import type { Session } from "../../features/auth/types/auth.types";

const SESSION_KEY = "orbit-session";
let memorySession = "";

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
