import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { ScrollView, View } from "react-native";
import { EmptyState } from "@/components/feedback/EmptyState";
import { Button } from "@/components/ui/Button";
import { Screen } from "@/components/ui/Screen";
import { AppText } from "@/components/ui/Text";
import { useLanguage } from "@/hooks/useLanguage";
import { useTheme } from "@/hooks/useTheme";
import { useSession } from "@/features/auth/hooks/useSession";
import { FeedCard } from "@/features/feed/components/FeedCard";
import { useFeed } from "@/features/feed/hooks/useFeed";
import { NativeSdkCard } from "@/features/native-sdk/components/NativeSdkCard";

export default function HomeScreen() {
  const { session } = useSession();
  const { items } = useFeed();
  const { t } = useLanguage(["common", "home"]);
  const { theme } = useTheme();
  const firstName = session?.user.name.split(" ")[0] ?? "";

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          className="overflow-hidden rounded-[34px]"
          style={{ borderColor: theme.border, borderWidth: 1 }}
        >
          <LinearGradient
            colors={theme.heroGradient}
            end={{ x: 1, y: 1 }}
            start={{ x: 0, y: 0 }}
            style={{ padding: 24 }}
          >
            <AppText variant="eyebrow">{t("home", { ns: "common" })}</AppText>
            <AppText className="mt-4 max-w-[280px]" variant="title">
              {t("title", { name: firstName, ns: "home" })}
            </AppText>
            <AppText className="mt-4 max-w-[320px]" tone="muted" variant="body">
              {t("body", { ns: "home" })}
            </AppText>
            <View className="mt-6 flex-row gap-3">
              <Link asChild href="/modal">
                <Button label={t("openModal", { ns: "home" })} />
              </Link>
              <Link asChild href="/(protected)/settings">
                <Button label={t("settings", { ns: "home" })} variant="secondary" />
              </Link>
            </View>
          </LinearGradient>
        </View>

        <View className="mt-8">
          <NativeSdkCard />
        </View>

        <View className="mt-8">
          <AppText variant="subtitle">{t("latestFeed", { ns: "home" })}</AppText>
          <AppText className="mt-2" tone="muted" variant="body">
            {t("latestFeedSubtitle", { ns: "home" })}
          </AppText>
        </View>

        <View className="mt-5 gap-4 pb-28">
          {items.length ? (
            items.map((item) => <FeedCard item={item} key={item.id} />)
          ) : (
            <EmptyState
              message={t("feedEmptyMessage", { ns: "home" })}
              title={t("feedEmptyTitle", { ns: "home" })}
            />
          )}
        </View>
      </ScrollView>
    </Screen>
  );
}
