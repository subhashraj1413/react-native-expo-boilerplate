import { useState } from "react";
import { ScrollView, View } from "react-native";
import { EmptyState } from "../../../components/feedback/EmptyState";
import { Input } from "../../../components/ui/Input";
import { Screen } from "../../../components/ui/Screen";
import { AppText } from "../../../components/ui/Text";
import { FeedCard } from "../../../features/feed/components/FeedCard";
import { useFeed } from "../../../features/feed/hooks/useFeed";

export default function SearchScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const { items } = useFeed(searchTerm);

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppText variant="eyebrow">Search</AppText>
        <AppText className="mt-4" variant="title">
          Search across feature-owned content.
        </AppText>
        <AppText className="mt-3 max-w-[320px]" tone="muted" variant="body">
          This tab keeps search isolated from navigation and session concerns so
          it can evolve independently.
        </AppText>

        <View className="mt-6">
          <Input
            label="Search the feed"
            onChangeText={setSearchTerm}
            placeholder="Try: redux, expo-router, nativewind"
            value={searchTerm}
          />
        </View>

        <View className="mt-6 gap-4 pb-28">
          {items.length ? (
            items.map((item) => <FeedCard item={item} key={item.id} />)
          ) : (
            <EmptyState
              message="No matching feed items were found."
              title="No results"
            />
          )}
        </View>
      </ScrollView>
    </Screen>
  );
}
