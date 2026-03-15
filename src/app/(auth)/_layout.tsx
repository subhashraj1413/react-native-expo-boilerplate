import { Redirect, Stack } from "expo-router";
import { ActivityIndicator } from "react-native";
import { useSession } from "../../features/auth/hooks/useSession";
import { Screen } from "../../components/ui/Screen";

export default function AuthLayout() {
  const { hydrated, isAuthenticated } = useSession();

  if (!hydrated) {
    return (
      <Screen className="items-center justify-center">
        <ActivityIndicator color="#81F3D0" />
      </Screen>
    );
  }

  if (isAuthenticated) {
    return <Redirect href="/(protected)/(tabs)/home" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
