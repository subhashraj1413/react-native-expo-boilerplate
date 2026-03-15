import { useRouter } from "expo-router";
import { View } from "react-native";
import { Button } from "../components/ui/Button";
import { Screen } from "../components/ui/Screen";
import { AppText } from "../components/ui/Text";
import { useSession } from "../features/auth/hooks/useSession";

export default function ModalScreen() {
  const router = useRouter();
  const { session, signOut } = useSession();

  return (
    <Screen>
      <View className="flex-1 justify-center">
        <View className="rounded-[32px] border border-white/10 bg-white/5 p-6">
          <AppText variant="eyebrow">Profile modal</AppText>
          <AppText className="mt-4" variant="title">
            Session actions
          </AppText>
          <AppText className="mt-3" tone="muted" variant="body">
            Signed in as {session?.user.name} ({session?.user.email})
          </AppText>

          <View className="mt-6 gap-3">
            <Button
              label="Close"
              onPress={() => {
                router.back();
              }}
              variant="secondary"
            />
            <Button
              label="Sign out"
              onPress={() => {
                signOut();
                router.replace("/(auth)/login");
              }}
            />
          </View>
        </View>
      </View>
    </Screen>
  );
}
