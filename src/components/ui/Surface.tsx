import type { PropsWithChildren } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { View } from "react-native";
import { useTheme } from "@/hooks/useTheme";

type SurfaceProps = PropsWithChildren<{
  className?: string;
  style?: StyleProp<ViewStyle>;
  tone?: "accent" | "danger" | "default" | "strong";
}>;

export const Surface = ({
  children,
  className = "",
  style,
  tone = "default",
}: SurfaceProps) => {
  const { theme } = useTheme();

  const surfaceStyles = {
    accent: {
      backgroundColor: theme.accentSoft,
      borderColor: theme.accentBorder,
    },
    danger: {
      backgroundColor: theme.dangerSoft,
      borderColor: theme.dangerBorder,
    },
    default: {
      backgroundColor: theme.card,
      borderColor: theme.border,
    },
    strong: {
      backgroundColor: theme.surfaceStrong,
      borderColor: theme.border,
    },
  } as const;

  return (
    <View
      className={className}
      style={[
        {
          borderWidth: 1,
        },
        surfaceStyles[tone],
        style,
      ]}
    >
      {children}
    </View>
  );
};
