import type { PropsWithChildren } from "react";
import type { StyleProp, TextStyle } from "react-native";
import { Text as RNText } from "react-native";
import { useLanguage } from "@/hooks/useLanguage";
import { useTheme } from "@/hooks/useTheme";

type AppTextProps = PropsWithChildren<{
  className?: string;
  style?: StyleProp<TextStyle>;
  tone?: "accent" | "danger" | "default" | "muted";
  variant?: "body" | "caption" | "eyebrow" | "subtitle" | "title";
}>;

const variantClasses = {
  body: "text-base leading-7",
  caption: "text-xs uppercase tracking-[1.8px]",
  eyebrow: "text-xs uppercase tracking-[2px] font-semibold",
  subtitle: "text-xl font-semibold leading-8",
  title: "text-3xl font-bold leading-10",
};

export const AppText = ({
  children,
  className = "",
  style,
  tone = "default",
  variant = "body",
}: AppTextProps) => {
  const { theme } = useTheme();
  const { isRTL } = useLanguage();

  const toneStyles = {
    accent: { color: theme.accent },
    danger: { color: theme.danger },
    default: { color: theme.primaryText },
    muted: { color: theme.secondaryText },
  } as const;

  return (
    <RNText
      className={`${variantClasses[variant]} ${className}`}
      style={[
        toneStyles[tone],
        {
          textAlign: isRTL ? "right" : "left",
          writingDirection: isRTL ? "rtl" : "ltr",
        },
        style,
      ]}
    >
      {children}
    </RNText>
  );
};
