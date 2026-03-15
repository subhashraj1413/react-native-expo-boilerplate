import { View } from "react-native";
import { AppText } from "../ui/Text";

type EmptyStateProps = {
  message: string;
  title: string;
};

export const EmptyState = ({ message, title }: EmptyStateProps) => {
  return (
    <View className="rounded-[28px] border border-white/10 bg-white/5 p-6">
      <AppText variant="subtitle">{title}</AppText>
      <AppText className="mt-3" tone="muted" variant="body">
        {message}
      </AppText>
    </View>
  );
};
