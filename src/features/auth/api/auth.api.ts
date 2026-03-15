import { DEMO_CREDENTIALS } from "../../../constants/env";
import { appApi, wait } from "../../../lib/api/client";
import { analytics } from "../../../lib/analytics/analytics";
import { sqliteUserRepository } from "../../../lib/storage/sqlite";
import { createApiError } from "../../../utils/format";
import { authActions } from "../store/auth.store";
import type {
  ForgotPasswordPayload,
  LoginPayload,
  RegisterPayload,
  Session,
} from "../types/auth.types";

export const authApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    forgotPassword: build.mutation<{ message: string }, ForgotPasswordPayload>({
      async queryFn(payload) {
        await wait(220);

        if (!payload.email.includes("@")) {
          return { error: createApiError("Enter a valid email address.") };
        }

        if (!sqliteUserRepository.hasUserWithEmail(payload.email)) {
          return { error: createApiError("No account exists for this email.", 404) };
        }

        analytics.track("auth_forgot_password", { email: payload.email });

        return {
          data: {
            message: "Reset instructions were sent to your inbox.",
          },
        };
      },
    }),
    login: build.mutation<Session, LoginPayload>({
      async onQueryStarted(_payload, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(authActions.setSession(data));
        } catch {
          analytics.track("auth_login_failed");
        }
      },
      async queryFn(payload) {
        await wait(260);
        const session = sqliteUserRepository.getUserByCredentials(
          payload.email,
          payload.password,
        );

        if (!session) {
          return {
            error: createApiError(
              `Use ${DEMO_CREDENTIALS.email} / ${DEMO_CREDENTIALS.password}`,
              401,
            ),
          };
        }

        return {
          data: session,
        };
      },
    }),
    register: build.mutation<Session, RegisterPayload>({
      async onQueryStarted(_payload, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(authActions.setSession(data));
      },
      async queryFn(payload) {
        await wait(300);

        if (!payload.fullName.trim()) {
          return { error: createApiError("Full name is required.") };
        }

        if (!payload.email.includes("@")) {
          return { error: createApiError("Enter a valid email address.") };
        }

        if (payload.password.length < 6) {
          return { error: createApiError("Password must be at least 6 characters.") };
        }

        analytics.track("auth_register", { email: payload.email });

        try {
          return {
            data: sqliteUserRepository.createUser({
              email: payload.email,
              fullName: payload.fullName,
              password: payload.password,
            }),
          };
        } catch (error) {
          return {
            error: createApiError(
              error instanceof Error ? error.message : "Unable to create account.",
              409,
            ),
          };
        }
      },
    }),
  }),
});

export const {
  useForgotPasswordMutation,
  useLoginMutation,
  useRegisterMutation,
} = authApi;
