import { Link } from "expo-router";
import { ScrollView, View } from "react-native";
import { Button } from "@/components/ui/Button";
import { Screen } from "@/components/ui/Screen";
import { AppText } from "@/components/ui/Text";

export default function SettingsScreen() {
  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppText variant="eyebrow">Settings</AppText>
        <AppText className="mt-4" variant="title">
          Settings now lives inside the protected drawer.
        </AppText>
        <AppText className="mt-3 max-w-[320px]" tone="muted" variant="body">
          Open the drawer from any protected screen to move between workspace,
          settings, and account without leaving the signed-in shell.
        </AppText>

        <View className="mt-8 gap-4">
          <Link asChild href="/(protected)/settings/account">
            <Button label="Open account section" />
          </Link>
          <Link asChild href="/modal">
            <Button label="Profile modal" variant="secondary" />
          </Link>
        </View>
      </ScrollView>
    </Screen>
  );
}
