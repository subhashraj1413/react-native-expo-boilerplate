import { getLocales } from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { resources } from "@/localization/resources";
import type { AppLanguage } from "@/types/global";

const detectDeviceLanguage = (): AppLanguage => {
  const locale = getLocales()[0];
  const languageCode = locale.languageTag;

  return languageCode.toLowerCase().startsWith("ar") ? "ar" : "en";
};

if (!i18n.isInitialized) {
  void i18n.use(initReactI18next).init({
    defaultNS: "common",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    lng: detectDeviceLanguage(),
    resources,
    returnEmptyString: false,
    returnNull: false,
    supportedLngs: ["en", "ar"],
  });
}

export const resolveInitialLanguage = (storedLanguage: AppLanguage | null): AppLanguage => {
  return storedLanguage ?? detectDeviceLanguage();
};

export default i18n;
