import { appApi } from "@/lib/api/client";
import { queryTags } from "@/lib/query/queryClient";
import { sqliteUserRepository } from "@/lib/storage/sqlite";
import type { RootState } from "@/lib/store";
import { createApiError } from "@/utils/format";
import { selectSession } from "@/features/auth/store/auth.store";
import type { UserProfile } from "@/features/user/types/user.types";

export const userApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    getCurrentUser: build.query<UserProfile, undefined>({
      queryFn(_arg, api) {
        const session = selectSession(api.getState() as RootState);

        if (!session) {
          return {
            error: createApiError("No active session was found.", 401),
          };
        }

        const profile = sqliteUserRepository.getCurrentUserProfile(session);

        if (!profile) {
          return {
            error: createApiError("The signed-in user could not be loaded.", 404),
          };
        }

        return { data: profile };
      },
      providesTags: [{ type: queryTags.user, id: "CURRENT" }],
    }),
  }),
});

export const { useGetCurrentUserQuery } = userApi;
