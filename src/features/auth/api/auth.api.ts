import { DEMO_CREDENTIALS } from "../../../constants/env";
import { appApi, wait } from "../../../lib/api/client";
import { analytics } from "../../../lib/analytics/analytics";
import { createApiError } from "../../../utils/format";
import { authActions } from "../store/auth.store";
import type {
  ForgotPasswordPayload,
  LoginPayload,
  RegisterPayload,
  Session,
} from "../types/auth.types";

const buildSession = (name: string, email: string): Session => ({
  token: "orbit-session-token",
  user: {
    email,
    id: "user-orbit-001",
    name,
    role: "Operations Director",
  },
});

export const authApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    forgotPassword: build.mutation<{ message: string }, ForgotPasswordPayload>({
      async queryFn(payload) {
        await wait(220);

        if (!payload.email.includes("@")) {
          return { error: createApiError("Enter a valid email address.") };
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

        if (
          payload.email.trim().toLowerCase() !== DEMO_CREDENTIALS.email ||
          payload.password !== DEMO_CREDENTIALS.password
        ) {
          return {
            error: createApiError(
              `Use ${DEMO_CREDENTIALS.email} / ${DEMO_CREDENTIALS.password}`,
              401,
            ),
          };
        }

        return {
          data: buildSession("Maya Chen", payload.email.trim().toLowerCase()),
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

        return {
          data: buildSession(payload.fullName.trim(), payload.email.toLowerCase()),
        };
      },
    }),
  }),
});

export const {
  useForgotPasswordMutation,
  useLoginMutation,
  useRegisterMutation,
} = authApi;
