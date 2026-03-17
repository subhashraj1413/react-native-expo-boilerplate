import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";
import { useTheme } from "@/hooks/useTheme";

type HeaderAiButtonProps = {
  disabled?: boolean;
};

export const HeaderAiButton = ({
  disabled = false,
}: HeaderAiButtonProps) => {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <Pressable
      className={`rounded-full p-2 ${disabled ? "opacity-60" : ""}`}
      disabled={disabled}
      onPress={() => {
        router.push("/(protected)/ai");
      }}
      style={{
        backgroundColor: theme.card,
        borderColor: theme.border,
        borderWidth: 1,
      }}
    >
      <Ionicons color={theme.accent} name="sparkles-outline" size={20} />
    </Pressable>
  );
};
