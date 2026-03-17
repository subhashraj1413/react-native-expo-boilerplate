import {
  createContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { I18nextProvider } from "react-i18next";
import { languageStorage } from "@/lib/storage/mmkv";
import i18n, { resolveInitialLanguage } from "@/localization/i18n";
import type { AppLanguage } from "@/types/global";

export type LocalizationContextValue = {
  isRTL: boolean;
  language: AppLanguage;
  setLanguage: (language: AppLanguage) => void;
};

const initialLanguage = resolveInitialLanguage(languageStorage.read());

export const LocalizationContext = createContext<LocalizationContextValue>({
  isRTL: initialLanguage === "ar",
  language: initialLanguage,
  setLanguage: () => undefined,
});

export const LocalizationProvider = ({ children }: PropsWithChildren) => {
  const [language, setLanguageState] = useState<AppLanguage>(initialLanguage);

  useEffect(() => {
    languageStorage.write(language);
    void i18n.changeLanguage(language);
  }, [language]);

  const value = useMemo<LocalizationContextValue>(
    () => ({
      isRTL: language === "ar",
      language,
      setLanguage: (next) => {
        setLanguageState(next);
      },
    }),
    [language],
  );

  return (
    <I18nextProvider i18n={i18n}>
      <LocalizationContext.Provider value={value}>
        {children}
      </LocalizationContext.Provider>
    </I18nextProvider>
  );
};
