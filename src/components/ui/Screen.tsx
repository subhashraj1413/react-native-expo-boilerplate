import type { PropsWithChildren } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, type Href } from "expo-router";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppText } from "@/components/ui/Text";
import { useTheme } from "@/hooks/useTheme";

type ScreenProps = PropsWithChildren<{
  backHref?: Href;
  backLabel?: string;
  className?: string;
  showBackButton?: boolean;
}>;

export const Screen = ({
  backHref,
  backLabel = "Back",
  children,
  className = "",
  showBackButton = false,
}: ScreenProps) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { theme } = useTheme();
  const canGoBack = router.canGoBack();
  const shouldShowBackButton = showBackButton || Boolean(backHref);

  return (
    <View
      className={`flex-1 px-5 ${className}`}
      style={{
        backgroundColor: theme.background,
        paddingBottom: Math.max(insets.bottom, 20),
        paddingTop: Math.max(insets.top, 16),
      }}
    >
      {shouldShowBackButton ? (
        <View className="mb-5 flex-row">
          <Pressable
            accessibilityLabel={backLabel}
            className="flex-row items-center gap-2 rounded-full px-4 py-3"
            disabled={!canGoBack && !backHref}
            onPress={() => {
              if (canGoBack) {
                router.back();
                return;
              }

              if (backHref) {
                router.replace(backHref);
              }
            }}
            style={{
              backgroundColor: theme.card,
              borderColor: theme.border,
              borderWidth: 1,
              opacity: !canGoBack && !backHref ? 0.5 : 1,
            }}
          >
            <Ionicons color={theme.primaryText} name="chevron-back" size={18} />
            <AppText variant="body">{backLabel}</AppText>
          </Pressable>
        </View>
      ) : null}
      {children}
    </View>
  );
};
