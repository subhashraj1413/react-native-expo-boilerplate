import type { PressableProps } from "react-native";
import { Pressable } from "react-native";
import { AppText } from "./Text";

type ButtonProps = PressableProps & {
  label: string;
  variant?: "ghost" | "primary" | "secondary";
};

const buttonStyles = {
  ghost: "border border-white/10 bg-transparent",
  primary: "bg-aqua",
  secondary: "border border-white/10 bg-white/5",
};

const labelStyles = {
  ghost: "text-sand",
  primary: "text-ink",
  secondary: "text-sand",
};

export const Button = ({
  disabled,
  label,
  variant = "primary",
  ...props
}: ButtonProps) => {
  return (
    <Pressable
      className={`items-center rounded-2xl px-5 py-4 ${buttonStyles[variant]} ${
        disabled ? "opacity-60" : ""
      }`}
      disabled={disabled}
      {...props}
    >
      <AppText className={labelStyles[variant]} variant="body">
        {label}
      </AppText>
    </Pressable>
  );
};
