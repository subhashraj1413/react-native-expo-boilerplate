import { appApi, wait } from "../../../lib/api/client";
import { queryTags } from "../../../lib/query/queryClient";
import type { FeedItem } from "../types/feed.types";

const feed: FeedItem[] = [
  {
    id: "feed-1",
    publishedAt: "2026-03-15T07:30:00.000Z",
    summary:
      "Expo Router is now the single navigation source. The old hand-written stack flow is gone.",
    tags: ["expo-router", "navigation"],
    title: "Router migration completed",
  },
  {
    id: "feed-2",
    publishedAt: "2026-03-15T08:10:00.000Z",
    summary:
      "RTK Query owns all server-state style data while saga handles orchestration after auth changes.",
    tags: ["redux", "rtk-query", "saga"],
    title: "Data layer simplified",
  },
  {
    id: "feed-3",
    publishedAt: "2026-03-15T09:00:00.000Z",
    summary:
      "NativeWind now styles shared UI primitives so screens stay consistent as the app grows.",
    tags: ["nativewind", "ui-system"],
    title: "Design system initialized",
  },
];

export const feedApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    getFeed: build.query<FeedItem[], undefined>({
      async queryFn() {
        await wait(280);
        return { data: feed };
      },
      providesTags: [{ type: queryTags.feed, id: "LIST" }],
    }),
  }),
});

export const { useGetFeedQuery } = feedApi;
