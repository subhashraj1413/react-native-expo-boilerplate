import { View } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { formatTimeLabel } from "@/utils/format";
import { Surface } from "@/components/ui/Surface";
import { AppText } from "@/components/ui/Text";
import type { FeedItem } from "@/features/feed/types/feed.types";

type FeedCardProps = {
  item: FeedItem;
};

export const FeedCard = ({ item }: FeedCardProps) => {
  const { theme } = useTheme();

  return (
    <Surface className="rounded-[28px] p-5">
      <View className="flex-row items-center justify-between gap-4">
        <AppText className="flex-1" variant="subtitle">
          {item.title}
        </AppText>
        <AppText tone="muted" variant="caption">
          {formatTimeLabel(item.publishedAt)}
        </AppText>
      </View>
      <AppText className="mt-3" tone="muted" variant="body">
        {item.summary}
      </AppText>
      <View className="mt-4 flex-row flex-wrap gap-2">
        {item.tags.map((tag) => (
          <Surface
            className="rounded-full px-3 py-1"
            key={tag}
            style={{
              backgroundColor: theme.accentSoft,
              borderColor: theme.accentBorder,
            }}
            tone="accent"
          >
            <AppText tone="accent" variant="caption">
              {tag}
            </AppText>
          </Surface>
        ))}
      </View>
    </Surface>
  );
};
