import { appApi } from "../../../lib/api/client";
import { queryTags } from "../../../lib/query/queryClient";
import type { RootState } from "../../../lib/store";
import { createApiError } from "../../../utils/format";
import { selectSession } from "../../auth/store/auth.store";
import type { Session } from "../../auth/types/auth.types";
import type { UserProfile } from "../types/user.types";

const buildProfile = (session: Session): UserProfile => ({
  bio: `${session.user.name} is focused on release quality, observability, and dependable cross-team delivery.`,
  email: session.user.email,
  highlights: [
    { id: "role", label: "Role", value: session.user.role },
    { id: "access", label: "Access", value: "Authenticated session" },
    { id: "email", label: "Email", value: session.user.email },
  ],
  id: session.user.id,
  location: "Dubai",
  name: session.user.name,
  role: session.user.role,
});

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

        return { data: buildProfile(session) };
      },
      providesTags: [{ type: queryTags.user, id: "CURRENT" }],
    }),
  }),
});

export const { useGetCurrentUserQuery } = userApi;
