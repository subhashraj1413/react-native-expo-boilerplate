import type { TextInputProps } from "react-native";
import { TextInput, View } from "react-native";
import { AppText } from "./Text";

type InputProps = TextInputProps & {
  label: string;
};

export const Input = ({ label, ...props }: InputProps) => {
  return (
    <View>
      <AppText className="mb-2" tone="muted" variant="caption">
        {label}
      </AppText>
      <TextInput
        className="rounded-2xl border border-white/10 bg-panel px-4 py-4 text-base text-sand"
        placeholderTextColor="#688098"
        {...props}
      />
    </View>
  );
};
