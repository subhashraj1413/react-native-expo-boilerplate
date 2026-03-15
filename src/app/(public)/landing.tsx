import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { Pressable, View } from "react-native";
import { Screen } from "@/components/ui/Screen";
import { Surface } from "@/components/ui/Surface";
import { AppText } from "@/components/ui/Text";
import { useTheme } from "@/hooks/useTheme";
import { useNetwork } from "@/hooks/useNetwork";

export default function LandingScreen() {
  const network = useNetwork();
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
            <AppText variant="eyebrow">Public landing</AppText>
            <AppText className="mt-4 max-w-[280px]" variant="title">
              Scaled Expo structure, not a template mashup.
            </AppText>
            <AppText className="mt-4 max-w-[320px]" tone="muted" variant="body">
              Public, auth, protected, modal, providers, feature APIs, theming,
              and shared UI are now split into purpose-built folders.
            </AppText>
          </LinearGradient>
        </View>

        <View className="gap-4 pb-10">
          <Surface className="rounded-[28px] p-6">
            <AppText variant="subtitle">Environment</AppText>
            <AppText className="mt-3" tone="muted" variant="body">
              Connectivity status: {network.isConnected ? "online" : "offline"}
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
                      Login
                    </AppText>
                    <AppText
                      style={{ color: theme.onAccent, opacity: 0.8 }}
                      variant="caption"
                    >
                      Enter the workspace
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
                  <AppText variant="subtitle">Register</AppText>
                  <AppText className="mt-1" tone="muted" variant="caption">
                    Create a fresh account
                  </AppText>
                </View>
                <View
                  className="rounded-full px-3 py-2"
                  style={{ backgroundColor: theme.accentSoft }}
                >
                  <AppText tone="accent" variant="caption">
                    New
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
