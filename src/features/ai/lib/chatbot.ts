import type { Href } from "expo-router";

export type ChatAction = {
  href: Href;
  label: string;
};

export type ChatReply = {
  actions?: ChatAction[];
  text: string;
};

const normalize = (value: string) => value.trim().toLowerCase();

export const getAssistantReply = (input: string, userName?: string): ChatReply => {
  const prompt = normalize(input);
  const firstName = userName?.split(" ")[0] ?? "there";

  if (!prompt) {
    return {
      text: "Ask me about navigation, settings, profile, search, feed, or account actions.",
    };
  }

  if (prompt.includes("home") || prompt.includes("feed") || prompt.includes("dashboard")) {
    return {
      actions: [{ href: "/(protected)/(tabs)/home", label: "Open home" }],
      text: "Home is the main workspace screen. It shows the feed cards and the primary signed-in overview.",
    };
  }

  if (prompt.includes("search") || prompt.includes("find")) {
    return {
      actions: [{ href: "/(protected)/(tabs)/search", label: "Open search" }],
      text: "Search lives in the protected tab group. Use it for discovery flows without leaving the main workspace.",
    };
  }

  if (prompt.includes("profile") || prompt.includes("user")) {
    return {
      actions: [{ href: "/(protected)/(tabs)/profile", label: "Open profile" }],
      text: "Profile holds your identity view and theme toggle. It is the best place for quick personal preferences.",
    };
  }

  if (prompt.includes("theme") || prompt.includes("dark") || prompt.includes("light")) {
    return {
      actions: [{ href: "/(protected)/(tabs)/profile", label: "Go to theme toggle" }],
      text: "Theme switching is currently exposed from the Profile tab. Open profile and use the Toggle theme action there.",
    };
  }

  if (prompt.includes("setting") || prompt.includes("preferences")) {
    return {
      actions: [{ href: "/(protected)/settings", label: "Open settings" }],
      text: "Settings is part of the protected drawer and contains the overview plus deeper account-related routes.",
    };
  }

  if (prompt.includes("account") || prompt.includes("password") || prompt.includes("email")) {
    return {
      actions: [{ href: "/(protected)/settings/account", label: "Open account" }],
      text: "Account is where signed-in identity details and sign-out controls currently live.",
    };
  }

  if (prompt.includes("logout") || prompt.includes("log out") || prompt.includes("sign out")) {
    return {
      actions: [{ href: "/(protected)/settings/account", label: "Open sign out screen" }],
      text: "The sign-out action is available from the account screen and in the protected drawer footer.",
    };
  }

  if (prompt.includes("drawer") || prompt.includes("menu") || prompt.includes("navigation")) {
    return {
      actions: [{ href: "/(protected)/(tabs)/home", label: "Back to workspace" }],
      text: "The protected area uses a shared drawer. Tabs stay inside the workspace screen group, while settings and account stay available from the same menu shell.",
    };
  }

  if (prompt.includes("hello") || prompt.includes("hi")) {
    return {
      text: `Hi ${firstName}. I can help you navigate the app and jump to the right protected screen.`,
    };
  }

  return {
    actions: [
      { href: "/(protected)/(tabs)/home", label: "Workspace" },
      { href: "/(protected)/settings", label: "Settings" },
    ],
    text: "I can help with app navigation and common actions. Try asking about home, search, profile, settings, account, theme, or sign out.",
  };
};
