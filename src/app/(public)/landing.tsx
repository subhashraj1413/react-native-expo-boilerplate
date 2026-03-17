import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { Pressable, View } from "react-native";
import { Screen } from "@/components/ui/Screen";
import { Surface } from "@/components/ui/Surface";
import { AppText } from "@/components/ui/Text";
import { useLanguage } from "@/hooks/useLanguage";
import { useTheme } from "@/hooks/useTheme";
import { useNetwork } from "@/hooks/useNetwork";

export default function LandingScreen() {
  const network = useNetwork();
  const { t } = useLanguage(["auth", "common", "landing"]);
  const { theme } = useTheme();

  return (
    <Screen>
      <View className="flex-1 justify-between">
        <View
          className="overflow-hidden rounded-[36px]"
          style={{ borderColor: theme.border, borderWidth: 1 }}
        >
          <LinearGradient
            colors={theme.heroGradient}
            end={{ x: 1, y: 1 }}
            start={{ x: 0, y: 0 }}
            style={{ padding: 28 }}
          >
            <AppText variant="eyebrow">{t("eyebrow", { ns: "landing" })}</AppText>
            <AppText className="mt-4 max-w-[280px]" variant="title">
              {t("title", { ns: "landing" })}
            </AppText>
            <AppText className="mt-4 max-w-[320px]" tone="muted" variant="body">
              {t("body", { ns: "landing" })}
            </AppText>
          </LinearGradient>
        </View>

        <View className="gap-4 pb-10">
          <Surface className="rounded-[28px] p-6">
            <AppText variant="subtitle">{t("environment", { ns: "landing" })}</AppText>
            <AppText className="mt-3" tone="muted" variant="body">
              {t("status", {
                ns: "landing",
                status: network.isConnected
                  ? t("online", { ns: "common" })
                  : t("offline", { ns: "common" }),
              })}
            </AppText>
          </Surface>

          <Link asChild href="/(auth)/login">
            <Pressable
              className="overflow-hidden rounded-[30px]"
              style={{
                shadowColor: theme.accent,
                shadowOffset: { width: 0, height: 18 },
                shadowOpacity: 0.18,
                shadowRadius: 28,
              }}
            >
              <LinearGradient
                colors={[theme.accent, theme.danger]}
                end={{ x: 1, y: 1 }}
                start={{ x: 0, y: 0 }}
                style={{ paddingHorizontal: 22, paddingVertical: 20 }}
              >
                <View className="flex-row items-center justify-between">
                  <View>
                    <AppText style={{ color: theme.onAccent }} variant="subtitle">
                      {t("login", { ns: "auth" })}
                    </AppText>
                    <AppText
                      style={{ color: theme.onAccent, opacity: 0.8 }}
                      variant="caption"
                    >
                      {t("enterWorkspace", { ns: "landing" })}
                    </AppText>
                  </View>
                  <View
                    className="items-center justify-center rounded-full"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.16)",
                      height: 44,
                      width: 44,
                    }}
                  >
                    <AppText style={{ color: theme.onAccent }} variant="subtitle">
                      →
                    </AppText>
                  </View>
                </View>
              </LinearGradient>
            </Pressable>
          </Link>

          <Link asChild href="/(auth)/register">
            <Pressable
              className="rounded-[30px] px-5 py-5"
              style={{
                backgroundColor: theme.card,
                borderColor: theme.border,
                borderWidth: 1,
              }}
            >
              <View className="flex-row items-center justify-between">
                <View>
                  <AppText variant="subtitle">{t("register", { ns: "landing" })}</AppText>
                  <AppText className="mt-1" tone="muted" variant="caption">
                    {t("registerSubtitle", { ns: "landing" })}
                  </AppText>
                </View>
                <View
                  className="rounded-full px-3 py-2"
                  style={{ backgroundColor: theme.accentSoft }}
                >
                  <AppText tone="accent" variant="caption">
                    {t("new", { ns: "common" })}
                  </AppText>
                </View>
              </View>
            </Pressable>
          </Link>
        </View>
      </View>
    </Screen>
  );
}
