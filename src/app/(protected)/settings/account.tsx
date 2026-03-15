import { View } from "react-native";
import { useRouter } from "expo-router";
import { Button } from "@/components/ui/Button";
import { Screen } from "@/components/ui/Screen";
import { Surface } from "@/components/ui/Surface";
import { AppText } from "@/components/ui/Text";
import { useSession } from "@/features/auth/hooks/useSession";

export default function AccountScreen() {
  const router = useRouter();
  const { session, signOut } = useSession();

  return (
    <Screen>
      <View className="flex-1">
        <AppText variant="eyebrow">Account</AppText>
        <AppText className="mt-4" variant="title">
          Account controls stay outside the tab bar.
        </AppText>
        <AppText className="mt-4" tone="muted" variant="body">
          Signed in as {session?.user.email}
        </AppText>

        <Surface className="mt-8 gap-4 rounded-[28px] p-6" tone="danger">
          <AppText variant="subtitle">Sign out</AppText>
          <AppText className="mt-2" tone="muted" variant="body">
            Signing out clears the session state and resets RTK Query caches via
            saga.
          </AppText>
          <Button
            label="Sign out"
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
