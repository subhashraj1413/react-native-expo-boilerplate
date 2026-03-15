import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { ScrollView, View } from "react-native";
import { EmptyState } from "../../../components/feedback/EmptyState";
import { Button } from "../../../components/ui/Button";
import { Screen } from "../../../components/ui/Screen";
import { AppText } from "../../../components/ui/Text";
import { useSession } from "../../../features/auth/hooks/useSession";
import { FeedCard } from "../../../features/feed/components/FeedCard";
import { useFeed } from "../../../features/feed/hooks/useFeed";

export default function HomeScreen() {
  const { session } = useSession();
  const { items } = useFeed();

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="overflow-hidden rounded-[34px] border border-white/10">
          <LinearGradient
            colors={["#16384A", "#102131", "#173221"]}
            end={{ x: 1, y: 1 }}
            start={{ x: 0, y: 0 }}
            style={{ padding: 24 }}
          >
            <AppText variant="eyebrow">Safe-area home</AppText>
            <AppText className="mt-4 max-w-[280px]" variant="title">
              Welcome back, {session?.user.name.split(" ")[0]}.
            </AppText>
            <AppText className="mt-4 max-w-[320px]" tone="muted" variant="body">
              The home screen is now fully safe-area aware and sits inside the
              protected tab group rather than a manual native stack config.
            </AppText>
            <View className="mt-6 flex-row gap-3">
              <Link asChild href="/modal">
                <Button label="Open profile modal" />
              </Link>
              <Link asChild href="/(protected)/settings">
                <Button label="Settings" variant="secondary" />
              </Link>
            </View>
          </LinearGradient>
        </View>

        <View className="mt-8">
          <AppText variant="subtitle">Latest feed</AppText>
          <AppText className="mt-2" tone="muted" variant="body">
            The feed module stays self-contained with its own API, hook, and card
            component.
          </AppText>
        </View>

        <View className="mt-5 gap-4 pb-28">
          {items.length ? (
            items.map((item) => <FeedCard item={item} key={item.id} />)
          ) : (
            <EmptyState
              message="No feed items are available for this workspace."
              title="Feed is empty"
            />
          )}
        </View>
      </ScrollView>
    </Screen>
  );
}
