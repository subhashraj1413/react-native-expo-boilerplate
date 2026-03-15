import { View } from "react-native";
import { AppText } from "../ui/Text";

type ErrorViewProps = {
  message: string;
};

export const ErrorView = ({ message }: ErrorViewProps) => {
  return (
    <View className="rounded-2xl border border-coral/25 bg-coral/10 px-4 py-3">
      <AppText className="text-coral" variant="body">
        {message}
      </AppText>
    </View>
  );
};
