import { Link } from "expo-router";
import { ScrollView, View } from "react-native";
import { Button } from "@/components/ui/Button";
import { Screen } from "@/components/ui/Screen";
import { AppText } from "@/components/ui/Text";

export default function SettingsScreen() {
  return (
    <Screen backHref="/(protected)/(tabs)/profile" showBackButton>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppText variant="eyebrow">Settings</AppText>
        <AppText className="mt-4" variant="title">
          Protected routes can branch cleanly outside tabs.
        </AppText>
        <AppText className="mt-3 max-w-[320px]" tone="muted" variant="body">
          Settings is no longer crammed into the main tab flow. Nested routes are
          available when the app needs depth without more tabs.
        </AppText>

        <View className="mt-8 gap-4">
          <Link asChild href="/(protected)/settings/account">
            <Button label="Account" />
          </Link>
          <Link asChild href="/modal">
            <Button label="Profile modal" variant="secondary" />
          </Link>
        </View>
      </ScrollView>
    </Screen>
  );
}
