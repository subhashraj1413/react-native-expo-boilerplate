import type { PropsWithChildren } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ScreenProps = PropsWithChildren<{
  className?: string;
}>;

export const Screen = ({ children, className = "" }: ScreenProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      className={`flex-1 bg-ink px-5 ${className}`}
      style={{
        paddingBottom: Math.max(insets.bottom, 20),
        paddingTop: Math.max(insets.top, 16),
      }}
    >
      {children}
    </View>
  );
};
