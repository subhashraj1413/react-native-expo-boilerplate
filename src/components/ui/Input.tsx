import type { TextInputProps } from "react-native";
import { TextInput, View } from "react-native";
import { useTheme } from "../../hooks/useTheme";
import { AppText } from "./Text";

type InputProps = TextInputProps & {
  label: string;
};

export const Input = ({ label, ...props }: InputProps) => {
  const { theme } = useTheme();

  return (
    <View>
      <AppText className="mb-2" tone="muted" variant="caption">
        {label}
      </AppText>
      <TextInput
        className="rounded-2xl px-4 py-4 text-base"
        placeholderTextColor={theme.placeholder}
        style={{
          backgroundColor: theme.inputBackground,
          borderColor: theme.border,
          borderWidth: 1,
          color: theme.primaryText,
        }}
        {...props}
      />
    </View>
  );
};
