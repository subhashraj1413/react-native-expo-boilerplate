import type { PropsWithChildren } from "react";
import { Text as RNText } from "react-native";

type AppTextProps = PropsWithChildren<{
  className?: string;
  tone?: "accent" | "default" | "muted";
  variant?: "body" | "caption" | "eyebrow" | "subtitle" | "title";
}>;

const variantClasses = {
  body: "text-base leading-7",
  caption: "text-xs uppercase tracking-[1.8px]",
  eyebrow: "text-xs uppercase tracking-[2px] font-semibold",
  subtitle: "text-xl font-semibold leading-8",
  title: "text-3xl font-bold leading-10",
};

const toneClasses = {
  accent: "text-aqua",
  default: "text-sand",
  muted: "text-mist",
};

export const AppText = ({
  children,
  className = "",
  tone = "default",
  variant = "body",
}: AppTextProps) => {
  return (
    <RNText className={`${variantClasses[variant]} ${toneClasses[tone]} ${className}`}>
      {children}
    </RNText>
  );
};
