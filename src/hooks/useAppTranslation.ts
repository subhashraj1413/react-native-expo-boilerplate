import { useContext } from "react";
import { useTranslation } from "react-i18next";
import {
  LocalizationContext,
  type LocalizationContextValue,
} from "@/providers/LocalizationProvider";

type Namespaces = readonly string[] | string;

export type UseAppTranslationValue = LocalizationContextValue & {
  i18n: ReturnType<typeof useTranslation>["i18n"];
  ready: ReturnType<typeof useTranslation>["ready"];
  t: ReturnType<typeof useTranslation>["t"];
};

export const useAppTranslation = (namespaces?: Namespaces): UseAppTranslationValue => {
  const context = useContext(LocalizationContext);
  const { i18n, ready, t } = useTranslation(namespaces);

  return {
    ...context,
    i18n,
    ready,
    t,
  };
};
