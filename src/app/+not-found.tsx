import { Link } from "expo-router";
import { View } from "react-native";
import { Button } from "@/components/ui/Button";
import { Screen } from "@/components/ui/Screen";
import { AppText } from "@/components/ui/Text";
import { useLanguage } from "@/hooks/useLanguage";

export default function NotFoundScreen() {
  const { t } = useLanguage("notFound");

  return (
    <Screen>
      <View className="flex-1 items-start justify-center">
        <AppText variant="eyebrow">404</AppText>
        <AppText className="mt-4 max-w-[280px]" variant="title">
          {t("title")}
        </AppText>
        <AppText className="mt-4 max-w-[320px]" tone="muted" variant="body">
          {t("body")}
        </AppText>
        <View className="mt-8 w-full">
          <Link asChild href="/(public)/landing">
            <Button label={t("button")} />
          </Link>
        </View>
      </View>
    </Screen>
  );
}
