import { Link } from "expo-router";
import { ScrollView, View } from "react-native";
import { Button } from "@/components/ui/Button";
import { Screen } from "@/components/ui/Screen";
import { AppText } from "@/components/ui/Text";
import { useLanguage } from "@/hooks/useLanguage";
import { UserCard } from "@/features/user/components/UserCard";
import { useGetCurrentUserQuery } from "@/features/user/api/user.api";

export default function ProfileScreen() {
  const { data } = useGetCurrentUserQuery(undefined);
  const { t } = useLanguage(["common", "profile"]);

  return (
    <Screen className="pb-6">
      <ScrollView showsVerticalScrollIndicator={false} className="mb-10">
        <AppText variant="eyebrow">{t("profile", { ns: "common" })}</AppText>
        <AppText className="mt-4" variant="title">
          {t("title", { ns: "profile" })}
        </AppText>
        <AppText className="mt-3 max-w-[320px]" tone="muted" variant="body">
          {t("body", { ns: "profile" })}
        </AppText>

        <View className="mt-6 gap-4">
          {data ? <UserCard profile={data} /> : null}

          <View className="mb-10 gap-3">
            <Link asChild href="/modal">
              <Button label={t("openModal", { ns: "profile" })} variant="secondary" />
            </Link>
            <Link asChild href="/(protected)/settings">
              <Button label={t("openSettings", { ns: "profile" })} variant="ghost" />
            </Link>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}
