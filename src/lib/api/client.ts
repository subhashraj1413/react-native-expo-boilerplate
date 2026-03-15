import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { queryTags } from "@/lib/query/queryClient";
import type { ApiError } from "@/types/global";

export const wait = (duration = 250) =>
  new Promise((resolve) => {
    setTimeout(resolve, duration);
  });

export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: fakeBaseQuery<ApiError>(),
  tagTypes: [queryTags.auth, queryTags.feed, queryTags.user],
  endpoints: () => ({}),
});
