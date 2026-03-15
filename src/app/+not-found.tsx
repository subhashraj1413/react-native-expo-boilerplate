import { Link } from "expo-router";
import { View } from "react-native";
import { Button } from "@/components/ui/Button";
import { Screen } from "@/components/ui/Screen";
import { AppText } from "@/components/ui/Text";

export default function NotFoundScreen() {
  return (
    <Screen>
      <View className="flex-1 items-start justify-center">
        <AppText variant="eyebrow">404</AppText>
        <AppText className="mt-4 max-w-[280px]" variant="title">
          This route does not exist in the new Expo Router structure.
        </AppText>
        <AppText className="mt-4 max-w-[320px]" tone="muted" variant="body">
          The app now lives under the `src/app` route tree with public, auth,
          protected, settings, and modal flows separated by concern.
        </AppText>
        <View className="mt-8 w-full">
          <Link asChild href="/(public)/landing">
            <Button label="Return home" />
          </Link>
        </View>
      </View>
    </Screen>
  );
}
