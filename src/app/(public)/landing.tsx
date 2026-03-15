import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { View } from "react-native";
import { Button } from "@/components/ui/Button";
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
          <Link asChild href="/(auth)/login" >
            <Button label="Login" variant="secondary" />
          </Link>
          <Link asChild href="/(auth)/register">
            <Button label="Register" variant="ghost" />
          </Link>
        </View>
      </View>
    </Screen>
  );
}
