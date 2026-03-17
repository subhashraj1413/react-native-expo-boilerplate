import { Link } from "expo-router";
import { ScrollView, View } from "react-native";
import { Button } from "@/components/ui/Button";
import { Screen } from "@/components/ui/Screen";
import { AppText } from "@/components/ui/Text";
import { useLanguage } from "@/hooks/useLanguage";

export default function SettingsScreen() {
  const { t } = useLanguage(["common", "settings"]);

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppText variant="eyebrow">{t("settings", { ns: "common" })}</AppText>
        <AppText className="mt-4" variant="title">
          {t("title", { ns: "settings" })}
        </AppText>
        <AppText className="mt-3 max-w-[320px]" tone="muted" variant="body">
          {t("body", { ns: "settings" })}
        </AppText>

        <View className="mt-8 gap-4">
          <Link asChild href="/(protected)/settings/account">
            <Button label={t("openAccount", { ns: "settings" })} />
          </Link>
          <Link asChild href="/modal">
            <Button label={t("profileModal", { ns: "settings" })} variant="secondary" />
          </Link>
        </View>
      </ScrollView>
    </Screen>
  );
}
