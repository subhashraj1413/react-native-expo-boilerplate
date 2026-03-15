import type { PropsWithChildren } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";

type ScreenProps = PropsWithChildren<{
  className?: string;
}>;

export const Screen = ({ children, className = "" }: ScreenProps) => {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  return (
    <View
      className={`flex-1 px-5 ${className}`}
      style={{
        backgroundColor: theme.background,
        paddingBottom: Math.max(insets.bottom, 20),
        paddingTop: Math.max(insets.top, 16),
      }}
    >
      {children}
    </View>
  );
};
