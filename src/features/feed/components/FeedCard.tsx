import { View } from "react-native";
import { formatTimeLabel } from "../../../utils/format";
import { AppText } from "../../../components/ui/Text";
import type { FeedItem } from "../types/feed.types";

type FeedCardProps = {
  item: FeedItem;
};

export const FeedCard = ({ item }: FeedCardProps) => {
  return (
    <View className="rounded-[28px] border border-white/10 bg-white/5 p-5">
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
          <View
            className="rounded-full border border-aqua/20 bg-aqua/10 px-3 py-1"
            key={tag}
          >
            <AppText tone="accent" variant="caption">
              {tag}
            </AppText>
          </View>
        ))}
      </View>
    </View>
  );
};
