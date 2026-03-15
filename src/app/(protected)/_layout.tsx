import { Redirect, Stack } from "expo-router";
import { ActivityIndicator } from "react-native";
import { Screen } from "../../components/ui/Screen";
import { useSession } from "../../features/auth/hooks/useSession";

export default function ProtectedLayout() {
  const { hydrated, isAuthenticated } = useSession();

  if (!hydrated) {
    return (
      <Screen className="items-center justify-center">
        <ActivityIndicator color="#81F3D0" />
      </Screen>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href="/(public)/landing" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
