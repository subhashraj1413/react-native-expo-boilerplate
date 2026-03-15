import type { PressableProps } from "react-native";
import { Pressable } from "react-native";
import { useTheme } from "../../hooks/useTheme";
import { AppText } from "./Text";

type ButtonProps = PressableProps & {
  label: string;
  variant?: "ghost" | "primary" | "secondary";
};

export const Button = ({
  disabled,
  label,
  variant = "primary",
  ...props
}: ButtonProps) => {
  const { theme } = useTheme();

  const buttonStyles = {
    ghost: {
      backgroundColor: "transparent",
      borderColor: theme.border,
    },
    primary: {
      backgroundColor: theme.accent,
      borderColor: theme.accent,
    },
    secondary: {
      backgroundColor: theme.accentSoft,
      borderColor: theme.accentBorder,
    },
  } as const;

  const labelStyles = {
    ghost: theme.primaryText,
    primary: theme.onAccent,
    secondary: theme.primaryText,
  } as const;

  return (
    <Pressable
      className={`items-center rounded-2xl px-5 py-4 ${disabled ? "opacity-60" : ""}`}
      disabled={disabled}
      style={[
        {
          borderWidth: 1,
        },
        buttonStyles[variant],
      ]}
      {...props}
    >
      <AppText style={{ color: labelStyles[variant] }} variant="body">
        {label}
      </AppText>
    </Pressable>
  );
};
