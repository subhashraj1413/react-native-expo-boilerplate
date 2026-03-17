import { openDatabaseSync, type SQLiteDatabase } from "expo-sqlite";
import { DEMO_CREDENTIALS } from "@/constants/env";
import type { Session } from "@/features/auth/types/auth.types";
import type { FeedItem } from "@/features/feed/types/feed.types";
import type { UserProfile } from "@/features/user/types/user.types";
import type { AppLanguage, ThemeMode } from "@/types/global";

type UserRow = {
  bio: string;
  email: string;
  id: string;
  location: string;
  name: string;
  password: string;
  role: string;
};

type FeedRow = {
  id: string;
  published_at: string;
  summary: string;
  tags_json: string;
  title: string;
};

const DATABASE_NAME = "react-native-expo-boilerplate.db";
const LANGUAGE_KEY = "language";
const SESSION_KEY = "session";
const THEME_KEY = "theme";

let database: SQLiteDatabase | null = null;
let initialized = false;

const seedFeed: FeedItem[] = [
  {
    id: "feed-1",
    publishedAt: "2026-03-15T07:30:00.000Z",
    summary:
      "Expo Router is now the single navigation source. The old hand-written stack flow is gone.",
    tags: ["expo-router", "navigation"],
    title: "Router migration completed",
  },
  {
    id: "feed-2",
    publishedAt: "2026-03-15T08:10:00.000Z",
    summary:
      "RTK Query owns all server-state style data while saga handles orchestration after auth changes.",
    tags: ["redux", "rtk-query", "saga"],
    title: "Data layer simplified",
  },
  {
    id: "feed-3",
    publishedAt: "2026-03-15T09:00:00.000Z",
    summary:
      "NativeWind now styles shared UI primitives so screens stay consistent as the app grows.",
    tags: ["nativewind", "ui-system"],
    title: "Design system initialized",
  },
];

const defaultUser: UserRow = {
  bio: "Operations lead focused on release quality, observability, and cross-team delivery.",
  email: DEMO_CREDENTIALS.email,
  id: "user-orbit-001",
  location: "Dubai",
  name: "Maya Chen",
  password: DEMO_CREDENTIALS.password,
  role: "Operations Director",
};

const getDatabase = () => {
  database ??= openDatabaseSync(DATABASE_NAME);

  if (!initialized) {
    initializeDatabase(database);
    initialized = true;
  }

  return database;
};

const initializeDatabase = (db: SQLiteDatabase) => {
  db.execSync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS app_settings (
      key TEXT PRIMARY KEY NOT NULL,
      value TEXT
    );
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      bio TEXT NOT NULL,
      location TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS feed_items (
      id TEXT PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      summary TEXT NOT NULL,
      published_at TEXT NOT NULL,
      tags_json TEXT NOT NULL
    );
  `);

  const existingUser = db.getFirstSync<{ count: number }>(
    "SELECT COUNT(*) as count FROM users",
  );
  const existingFeed = db.getFirstSync<{ count: number }>(
    "SELECT COUNT(*) as count FROM feed_items",
  );

  db.withTransactionSync(() => {
    if (!existingUser?.count) {
      db.runSync(
        `INSERT INTO users (id, email, password, name, role, bio, location)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        defaultUser.id,
        defaultUser.email,
        defaultUser.password,
        defaultUser.name,
        defaultUser.role,
        defaultUser.bio,
        defaultUser.location,
      );
    }

    if (!existingFeed?.count) {
      for (const item of seedFeed) {
        db.runSync(
          `INSERT INTO feed_items (id, title, summary, published_at, tags_json)
           VALUES (?, ?, ?, ?, ?)`,
          item.id,
          item.title,
          item.summary,
          item.publishedAt,
          JSON.stringify(item.tags),
        );
      }
    }
  });
};

const getLegacyWebStorage = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage;
};

const readSetting = (key: string) => {
  const db = getDatabase();
  const result = db.getFirstSync<{ value: string | null }>(
    "SELECT value FROM app_settings WHERE key = ?",
    key,
  );

  return result?.value ?? null;
};

const writeSetting = (key: string, value: string) => {
  const db = getDatabase();
  db.runSync(
    `INSERT INTO app_settings (key, value)
     VALUES (?, ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value`,
    key,
    value,
  );
};

const clearSetting = (key: string) => {
  const db = getDatabase();
  db.runSync("DELETE FROM app_settings WHERE key = ?", key);
};

const mapUserRowToSession = (user: UserRow): Session => ({
  token: `session-${user.id}`,
  user: {
    email: user.email,
    id: user.id,
    name: user.name,
    role: user.role,
  },
});

const mapUserRowToProfile = (user: UserRow): UserProfile => ({
  bio: user.bio,
  email: user.email,
  highlights: [
    { id: "role", label: "Role", value: user.role },
    { id: "location", label: "Location", value: user.location },
    { id: "email", label: "Email", value: user.email },
  ],
  id: user.id,
  location: user.location,
  name: user.name,
  role: user.role,
});

const mapFeedRow = (row: FeedRow): FeedItem => ({
  id: row.id,
  publishedAt: row.published_at,
  summary: row.summary,
  tags: JSON.parse(row.tags_json) as string[],
  title: row.title,
});

export const sqliteStorage = {
  clearSession() {
    clearSetting(SESSION_KEY);
  },
  readSession(): Session | null {
    const stored = readSetting(SESSION_KEY);

    if (stored) {
      try {
        return JSON.parse(stored) as Session;
      } catch {
        clearSetting(SESSION_KEY);
      }
    }

    const legacyStorage = getLegacyWebStorage();
    const legacyValue = legacyStorage?.getItem("orbit-session");

    if (!legacyValue) {
      return null;
    }

    try {
      const session = JSON.parse(legacyValue) as Session;
      writeSetting(SESSION_KEY, legacyValue);
      legacyStorage?.removeItem("orbit-session");
      return session;
    } catch {
      legacyStorage?.removeItem("orbit-session");
      return null;
    }
  },
  readTheme(): ThemeMode | null {
    const stored = readSetting(THEME_KEY);

    if (stored === "dark" || stored === "light") {
      return stored;
    }

    const legacyStorage = getLegacyWebStorage();
    const legacyValue = legacyStorage?.getItem("orbit-theme");

    if (legacyValue === "dark" || legacyValue === "light") {
      writeSetting(THEME_KEY, legacyValue);
      legacyStorage?.removeItem("orbit-theme");
      return legacyValue;
    }

    return null;
  },
  readLanguage(): AppLanguage | null {
    const stored = readSetting(LANGUAGE_KEY);

    if (stored === "ar" || stored === "en") {
      return stored;
    }

    return null;
  },
  writeSession(session: Session) {
    writeSetting(SESSION_KEY, JSON.stringify(session));
  },
  writeLanguage(language: AppLanguage) {
    writeSetting(LANGUAGE_KEY, language);
  },
  writeTheme(mode: ThemeMode) {
    writeSetting(THEME_KEY, mode);
  },
};

export const sqliteUserRepository = {
  createUser(input: {
    email: string;
    fullName: string;
    password: string;
  }): Session {
    const db = getDatabase();
    const normalizedEmail = input.email.trim().toLowerCase();
    const existing = db.getFirstSync<UserRow>(
      "SELECT * FROM users WHERE email = ?",
      normalizedEmail,
    );

    if (existing) {
      throw new Error("An account with this email already exists.");
    }

    const id = `user-${String(Date.now())}`;
    const user: UserRow = {
      bio: `${input.fullName.trim()} joined the workspace and can now customize their profile data.`,
      email: normalizedEmail,
      id,
      location: "Remote",
      name: input.fullName.trim(),
      password: input.password,
      role: "Workspace Member",
    };

    db.runSync(
      `INSERT INTO users (id, email, password, name, role, bio, location)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      user.id,
      user.email,
      user.password,
      user.name,
      user.role,
      user.bio,
      user.location,
    );

    return mapUserRowToSession(user);
  },
  getCurrentUserProfile(session: Session): UserProfile | null {
    const db = getDatabase();
    const user = db.getFirstSync<UserRow>(
      "SELECT * FROM users WHERE id = ?",
      session.user.id,
    );

    return user ? mapUserRowToProfile(user) : null;
  },
  getUserByCredentials(email: string, password: string): Session | null {
    const db = getDatabase();
    const user = db.getFirstSync<UserRow>(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      email.trim().toLowerCase(),
      password,
    );

    return user ? mapUserRowToSession(user) : null;
  },
  hasUserWithEmail(email: string): boolean {
    const db = getDatabase();
    const user = db.getFirstSync<{ id: string }>(
      "SELECT id FROM users WHERE email = ?",
      email.trim().toLowerCase(),
    );

    return Boolean(user);
  },
};

export const sqliteFeedRepository = {
  listFeedItems(): FeedItem[] {
    const db = getDatabase();
    const rows = db.getAllSync<FeedRow>(
      "SELECT * FROM feed_items ORDER BY published_at DESC",
    );

    return rows.map(mapFeedRow);
  },
};
