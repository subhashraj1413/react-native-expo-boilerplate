import { useRouter } from "expo-router";
import { View } from "react-native";
import { Button } from "@/components/ui/Button";
import { Screen } from "@/components/ui/Screen";
import { Surface } from "@/components/ui/Surface";
import { AppText } from "@/components/ui/Text";
import { useSession } from "@/features/auth/hooks/useSession";
import { useLanguage } from "@/hooks/useLanguage";

export default function ModalScreen() {
  const router = useRouter();
  const { session, signOut } = useSession();
  const { t } = useLanguage(["common", "modal"]);

  return (
    <Screen>
      <View className="flex-1 justify-center">
        <Surface className="rounded-[32px] p-6">
          <AppText variant="eyebrow">{t("eyebrow", { ns: "modal" })}</AppText>
          <AppText className="mt-4" variant="title">
            {t("title", { ns: "modal" })}
          </AppText>
          <AppText className="mt-3" tone="muted" variant="body">
            {t("signedInAs", {
              email: session?.user.email ?? "",
              name: session?.user.name ?? "",
              ns: "modal",
            })}
          </AppText>

          <View className="mt-6 gap-3">
            <Button
              label={t("close", { ns: "common" })}
              onPress={() => {
                router.back();
              }}
              variant="secondary"
            />
            <Button
              label={t("signOut", { ns: "common" })}
              onPress={() => {
                signOut();
                router.replace("/(auth)/login");
              }}
            />
          </View>
        </Surface>
      </View>
    </Screen>
  );
}
