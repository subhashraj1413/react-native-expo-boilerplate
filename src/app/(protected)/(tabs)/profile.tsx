import { Link } from "expo-router";
import { ScrollView, View } from "react-native";
import { Button } from "@/components/ui/Button";
import { Screen } from "@/components/ui/Screen";
import { Surface } from "@/components/ui/Surface";
import { AppText } from "@/components/ui/Text";
import { useTheme } from "@/hooks/useTheme";
import { UserCard } from "@/features/user/components/UserCard";
import { useGetCurrentUserQuery } from "@/features/user/api/user.api";

export default function ProfileScreen() {
  const { data } = useGetCurrentUserQuery(undefined);
  const { mode, toggleTheme } = useTheme();

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppText variant="eyebrow">Profile</AppText>
        <AppText className="mt-4" variant="title">
          Identity and preferences live here.
        </AppText>
        <AppText className="mt-3 max-w-[320px]" tone="muted" variant="body">
          Profile remains a tab while destructive actions move into a modal and
          account settings route.
        </AppText>

        <View className="mt-6 gap-4">
          {data ? <UserCard profile={data} /> : null}

          <Surface className="rounded-[28px] p-6">
            <AppText variant="subtitle">Theme</AppText>
            <AppText className="mt-3" tone="muted" variant="body">
              Current mode: {mode}
            </AppText>
            <View className="mt-5 gap-3">
              <Button label="Toggle theme" onPress={toggleTheme} variant="secondary" />
              <Link asChild href="/modal">
                <Button label="Open profile modal"  variant="secondary" />
              </Link>
              <Link asChild href="/(protected)/settings/account">
                <Button label="Account settings" variant="ghost" />
              </Link>
            </View>
          </Surface>
        </View>
      </ScrollView>
    </Screen>
  );
}
