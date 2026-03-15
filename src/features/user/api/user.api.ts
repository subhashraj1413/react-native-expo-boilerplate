import { appApi, wait } from "../../../lib/api/client";
import { queryTags } from "../../../lib/query/queryClient";
import type { UserProfile } from "../types/user.types";

const profile: UserProfile = {
  bio: "Operations lead focused on release quality, observability, and cross-team delivery.",
  email: "maya@orbitops.app",
  highlights: [
    { id: "timezone", label: "Timezone", value: "GMT+4" },
    { id: "squad", label: "Squad", value: "Growth Systems" },
    { id: "tenure", label: "Tenure", value: "4 years" },
  ],
  id: "user-orbit-001",
  location: "Dubai",
  name: "Maya Chen",
  role: "Operations Director",
};

export const userApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    getCurrentUser: build.query<UserProfile, undefined>({
      async queryFn() {
        await wait(200);
        return { data: profile };
      },
      providesTags: [{ type: queryTags.user, id: "CURRENT" }],
    }),
  }),
});

export const { useGetCurrentUserQuery } = userApi;
