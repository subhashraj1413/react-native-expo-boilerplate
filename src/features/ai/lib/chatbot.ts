import type { Href } from "expo-router";
import type { TFunction } from "i18next";
import type { AppLanguage } from "@/types/global";

export type ChatAction = {
  href: Href;
  label: string;
};

export type ChatReply = {
  actions?: ChatAction[];
  text: string;
};

const normalize = (value: string) => value.trim().toLowerCase();

const containsAny = (prompt: string, terms: string[]) =>
  terms.some((term) => prompt.includes(term));

export const getAssistantReply = (
  t: TFunction,
  input: string,
  language: AppLanguage,
  userName?: string,
): ChatReply => {
  const prompt = normalize(input);
  const firstName = userName?.split(" ")[0] ?? t("fallbackName", { ns: "ai" });

  if (!prompt) {
    return {
      text: t("emptyPrompt", { ns: "ai" }),
    };
  }

  if (containsAny(prompt, ["home", "feed", "dashboard", "الرئيس", "الخلاصة"])) {
    return {
      actions: [{ href: "/(protected)/(tabs)/home", label: t("openHome", { ns: "ai" }) }],
      text: t("chatbot.homeText", { ns: "ai" }),
    };
  }

  if (containsAny(prompt, ["search", "find", "بحث"])) {
    return {
      actions: [{ href: "/(protected)/(tabs)/search", label: t("openSearch", { ns: "ai" }) }],
      text: t("chatbot.searchText", { ns: "ai" }),
    };
  }

  if (containsAny(prompt, ["profile", "user", "الملف", "شخصي"])) {
    return {
      actions: [{ href: "/(protected)/(tabs)/profile", label: t("openProfile", { ns: "ai" }) }],
      text: t("chatbot.profileText", { ns: "ai" }),
    };
  }

  if (containsAny(prompt, ["theme", "dark", "light", "المظهر", "داكن", "فاتح"])) {
    return {
      actions: [{ href: "/(protected)/(tabs)/home", label: t("openDrawerMenu", { ns: "ai" }) }],
      text: t("chatbot.themeText", { ns: "ai" }),
    };
  }

  if (containsAny(prompt, ["setting", "preferences", "الإعداد", "تفضيل"])) {
    return {
      actions: [{ href: "/(protected)/settings", label: t("openSettings", { ns: "ai" }) }],
      text: t("chatbot.settingsText", { ns: "ai" }),
    };
  }

  if (containsAny(prompt, ["account", "password", "email", "الحساب", "البريد", "كلمة"])) {
    return {
      actions: [{ href: "/(protected)/settings/account", label: t("openAccount", { ns: "ai" }) }],
      text: t("chatbot.accountText", { ns: "ai" }),
    };
  }

  if (containsAny(prompt, ["logout", "log out", "sign out", "تسجيل الخروج", "الخروج"])) {
    return {
      actions: [{ href: "/(protected)/settings/account", label: t("openSignOut", { ns: "ai" }) }],
      text: t("chatbot.signOutText", { ns: "ai" }),
    };
  }

  if (containsAny(prompt, ["drawer", "menu", "navigation", "القائمة", "الدرج", "التنقل"])) {
    return {
      actions: [{ href: "/(protected)/(tabs)/home", label: t("backToWorkspace", { ns: "ai" }) }],
      text: t("chatbot.drawerText", { ns: "ai" }),
    };
  }

  if (containsAny(prompt, ["hello", "hi", "مرحبا", "مرحباً", "اهلا"])) {
    return {
      text: t("chatbot.greetingReply", { name: firstName, ns: "ai" }),
    };
  }

  return {
    actions: [
      { href: "/(protected)/(tabs)/home", label: t("workspace", { ns: "common" }) },
      { href: "/(protected)/settings", label: t("settings", { ns: "common" }) },
    ],
    text: t("chatbot.fallbackText", { ns: "ai" }),
  };
};
