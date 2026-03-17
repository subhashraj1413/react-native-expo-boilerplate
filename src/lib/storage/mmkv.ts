import type { Session } from "@/features/auth/types/auth.types";
import type { AppLanguage, ThemeMode } from "@/types/global";
import { sqliteStorage } from "@/lib/storage/sqlite";

export const sessionStorage = {
  clear() {
    sqliteStorage.clearSession();
  },
  read(): Session | null {
    return sqliteStorage.readSession();
  },
  write(session: Session) {
    sqliteStorage.writeSession(session);
  },
};

export const themeStorage = {
  clear() {
    sqliteStorage.writeTheme("dark");
  },
  read(): ThemeMode | null {
    return sqliteStorage.readTheme();
  },
  write(mode: ThemeMode) {
    sqliteStorage.writeTheme(mode);
  },
};

export const languageStorage = {
  read(): AppLanguage | null {
    return sqliteStorage.readLanguage();
  },
  write(language: AppLanguage) {
    sqliteStorage.writeLanguage(language);
  },
};
