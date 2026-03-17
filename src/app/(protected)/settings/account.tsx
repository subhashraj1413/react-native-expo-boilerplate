import { View } from "react-native";
import { useRouter } from "expo-router";
import { Button } from "@/components/ui/Button";
import { Screen } from "@/components/ui/Screen";
import { Surface } from "@/components/ui/Surface";
import { AppText } from "@/components/ui/Text";
import { useSession } from "@/features/auth/hooks/useSession";
import { useLanguage } from "@/hooks/useLanguage";

export default function AccountScreen() {
  const router = useRouter();
  const { session, signOut } = useSession();
  const { t } = useLanguage(["common", "settings"]);

  return (
    <Screen>
      <View className="flex-1">
        <AppText variant="eyebrow">{t("account", { ns: "common" })}</AppText>
        <AppText className="mt-4" variant="title">
          {t("accountTitle", { ns: "settings" })}
        </AppText>
        <AppText className="mt-4" tone="muted" variant="body">
          {t("accountSignedInAs", { email: session?.user.email ?? "", ns: "settings" })}
        </AppText>

        <Surface className="mt-8 gap-4 rounded-[28px] p-6" tone="danger">
          <AppText variant="subtitle">{t("signOutTitle", { ns: "settings" })}</AppText>
          <AppText className="mt-2" tone="muted" variant="body">
            {t("signOutBody", { ns: "settings" })}
          </AppText>
          <Button
            label={t("signOut", { ns: "common" })}
            onPress={() => {
              signOut();
              router.replace("/(auth)/login");
            }}
          />
        </Surface>
      </View>
    </Screen>
  );
}
