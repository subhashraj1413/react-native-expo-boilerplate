import { View } from "react-native";
import type { UserProfile } from "../types/user.types";
import { AppText } from "../../../components/ui/Text";

type UserCardProps = {
  profile: UserProfile;
};

export const UserCard = ({ profile }: UserCardProps) => {
  return (
    <View className="rounded-[28px] border border-white/10 bg-white/5 p-6">
      <View className="h-16 w-16 items-center justify-center rounded-full bg-aqua">
        <AppText className="text-ink" variant="title">
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
          <View
            className="rounded-2xl border border-white/10 bg-panel px-4 py-3"
            key={item.id}
          >
            <AppText variant="eyebrow">{item.label}</AppText>
            <AppText className="mt-2" variant="body">
              {item.value}
            </AppText>
          </View>
        ))}
      </View>
    </View>
  );
};
