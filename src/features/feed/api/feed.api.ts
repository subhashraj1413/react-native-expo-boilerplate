import { appApi, wait } from "../../../lib/api/client";
import { queryTags } from "../../../lib/query/queryClient";
import { sqliteFeedRepository } from "../../../lib/storage/sqlite";
import type { FeedItem } from "../types/feed.types";

export const feedApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    getFeed: build.query<FeedItem[], undefined>({
      async queryFn() {
        await wait(280);
        return { data: sqliteFeedRepository.listFeedItems() };
      },
      providesTags: [{ type: queryTags.feed, id: "LIST" }],
    }),
  }),
});

export const { useGetFeedQuery } = feedApi;
