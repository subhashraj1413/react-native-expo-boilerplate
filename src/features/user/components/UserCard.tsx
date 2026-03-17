import { View } from "react-native";
import type { UserProfile } from "@/features/user/types/user.types";
import { useLanguage } from "@/hooks/useLanguage";
import { useTheme } from "@/hooks/useTheme";
import { Surface } from "@/components/ui/Surface";
import { AppText } from "@/components/ui/Text";

type UserCardProps = {
  profile: UserProfile;
};

export const UserCard = ({ profile }: UserCardProps) => {
  const { t } = useLanguage("user");
  const { theme } = useTheme();
  const labelMap: Record<string, string> = {
    Email: t("email"),
    Location: t("location"),
    Role: t("role"),
  };

  return (
    <Surface className="rounded-[28px] p-6">
      <View
        className="h-16 w-16 items-center justify-center rounded-full"
        style={{ backgroundColor: theme.accent }}
      >
        <AppText style={{ color: theme.onAccent }} variant="title">
          {profile.name
            .split(" ")
            .map((part) => part[0])
            .join("")}
        </AppText>
      </View>
      <AppText className="mt-4" variant="title">
        {profile.name}
      </AppText>
      <AppText className="mt-2" tone="accent" variant="body">
        {profile.role}
      </AppText>
      <AppText className="mt-3" tone="muted" variant="body">
        {profile.bio}
      </AppText>

      <View className="mt-6 gap-3">
        {profile.highlights.map((item) => (
          <Surface className="rounded-2xl px-4 py-3" key={item.id} tone="strong">
            <AppText variant="eyebrow">
              {labelMap[item.label] ?? item.label}
            </AppText>
            <AppText className="mt-2" variant="body">
              {item.value}
            </AppText>
          </Surface>
        ))}
      </View>
    </Surface>
  );
};
