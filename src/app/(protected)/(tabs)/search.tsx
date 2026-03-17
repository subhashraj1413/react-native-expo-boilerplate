import { useState } from "react";
import { ScrollView, View } from "react-native";
import { EmptyState } from "@/components/feedback/EmptyState";
import { Input } from "@/components/ui/Input";
import { Screen } from "@/components/ui/Screen";
import { AppText } from "@/components/ui/Text";
import { FeedCard } from "@/features/feed/components/FeedCard";
import { useFeed } from "@/features/feed/hooks/useFeed";
import { useLanguage } from "@/hooks/useLanguage";

export default function SearchScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const { items } = useFeed(searchTerm);
  const { t } = useLanguage(["common", "search"]);

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppText variant="eyebrow">{t("search", { ns: "common" })}</AppText>
        <AppText className="mt-4" variant="title">
          {t("title", { ns: "search" })}
        </AppText>
        <AppText className="mt-3 max-w-[320px]" tone="muted" variant="body">
          {t("body", { ns: "search" })}
        </AppText>

        <View className="mt-6">
          <Input
            label={t("inputLabel", { ns: "search" })}
            onChangeText={setSearchTerm}
            placeholder={t("inputPlaceholder", { ns: "search" })}
            value={searchTerm}
          />
        </View>

        <View className="mt-6 gap-4 pb-28">
          {items.length ? (
            items.map((item) => <FeedCard item={item} key={item.id} />)
          ) : (
            <EmptyState
              message={t("noResultsBody", { ns: "search" })}
              title={t("noResultsTitle", { ns: "search" })}
            />
          )}
        </View>
      </ScrollView>
    </Screen>
  );
}
