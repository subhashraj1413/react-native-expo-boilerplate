# React Native Expo Boilerplate

Production-style Expo Router starter with native iOS and Android folders, protected navigation, SQLite-backed demo data, global theming, and EN/AR localization.

## Demo

App walkthrough video: [assets/app-demo.mov](./assets/app-demo.mov)

- Format: `.mov`
- Duration: ~35 seconds
- Resolution: `1206x2622`

## What is included

- Expo SDK 55 with Expo Router route groups for `public`, `auth`, `protected`, `settings`, and `modal`
- Protected drawer shell with nested tabs for `Home`, `Search`, and `Profile`
- AI assistant screen with in-app navigation prompts
- Redux Toolkit store with RTK Query and saga orchestration
- SQLite persistence for users, feed items, session, theme, and language
- Global light/dark theme toggle
- `react-i18next` + `expo-localization` setup with modular EN/AR resources
- NativeWind-powered shared UI primitives

## Demo credentials

Use the seeded account from the app:

- Email: `maya@orbitops.app`
- Password: `orbit-55`

The seeded user and feed data are defined in [`src/lib/storage/sqlite.ts`](./src/lib/storage/sqlite.ts) and [`src/constants/env.ts`](./src/constants/env.ts).

## Tech stack

- Expo / React Native / React 19
- Expo Router
- Redux Toolkit, RTK Query, Redux Saga
- Expo SQLite
- react-i18next, i18next, expo-localization
- NativeWind
- TypeScript, ESLint, Prettier, Jest

## Project structure

```text
src/
  app/
    (public)/landing.tsx
    (auth)/login.tsx
    (auth)/register.tsx
    (auth)/forgot-password.tsx
    (protected)/(tabs)/home.tsx
    (protected)/(tabs)/search.tsx
    (protected)/(tabs)/profile.tsx
    (protected)/settings/index.tsx
    (protected)/settings/account.tsx
    (protected)/ai.tsx
    modal.tsx
  components/
  features/
    auth/
    feed/
    user/
    ai/
  hooks/
  lib/
    api/
    query/
    storage/
  localization/
    i18n.ts
    resources/
      en/
      ar/
  providers/
  theme/
```

## Getting started

### Prerequisites

- Node.js `>=18`
- Xcode for iOS
- Android Studio and Android SDK for Android
- CocoaPods for iOS native dependencies

### Install dependencies

```bash
yarn install
```

### Start Metro

```bash
yarn start
```

### Run iOS

```bash
yarn ios
```

### Run Android

```bash
yarn android
```

## Useful commands

```bash
yarn start
yarn ios
yarn android
yarn prebuild
yarn type-check
yarn lint
yarn test
```

## Localization

Localization is initialized in [`src/localization/i18n.ts`](./src/localization/i18n.ts). Translation resources are split by language and namespace under [`src/localization/resources`](./src/localization/resources), and the UI consumes translations through [`src/hooks/useAppTranslation.ts`](./src/hooks/useAppTranslation.ts).

## Persistence

SQLite is used for seeded demo content and app settings:

- `users`
- `feed_items`
- `app_settings`

That storage layer lives in [`src/lib/storage/sqlite.ts`](./src/lib/storage/sqlite.ts).

## Notes

- This repo contains native folders under `ios/` and `android/`, so after adding native Expo modules you should rebuild the native app.
- The app currently ships with a portrait-only orientation and Expo new architecture enabled in [`app.json`](./app.json).
