import { Link } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { ScrollView, View } from "react-native";
import { DEMO_CREDENTIALS } from "@/constants/env";
import { AuthForm } from "@/features/auth/components/AuthForm";
import {
  authenticateWithBiometrics,
  clearBiometricCredentials,
  getBiometricStatus,
  readBiometricCredentials,
  saveBiometricCredentials,
} from "@/features/auth/lib/biometrics";
import { useLoginMutation } from "@/features/auth/api/auth.api";
import { Screen } from "@/components/ui/Screen";
import { AppText } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/hooks/useLanguage";
import { formatApiError } from "@/utils/format";

export default function LoginScreen() {
  const [login, { error, isLoading }] = useLoginMutation();
  const { t } = useLanguage("auth");
  const [biometricError, setBiometricError] = useState<string | null>(null);
  const [biometricKind, setBiometricKind] = useState<"face" | "fingerprint" | "iris" | "unknown">(
    "unknown",
  );
  const [biometricReady, setBiometricReady] = useState(false);
  const [hasBiometricCredentials, setHasBiometricCredentials] = useState(false);
  const [isBiometricLoading, setIsBiometricLoading] = useState(false);
  const signInFallback = t("signInUnable");
  const methodLabelMap = {
    face: t("biometricMethodFace"),
    fingerprint: t("biometricMethodFingerprint"),
    iris: t("biometricMethodIris"),
    unknown: t("biometricMethodGeneric"),
  } as const;
  const biometricMethodLabel = methodLabelMap[biometricKind];

  useEffect(() => {
    let active = true;

    const loadBiometricState = async () => {
      const status = await getBiometricStatus();

      if (!active) {
        return;
      }

      setBiometricKind(status.kind);
      setHasBiometricCredentials(status.isAvailable && status.hasSavedCredentials);
      setBiometricReady(status.isAvailable);
    };

    void loadBiometricState();

    return () => {
      active = false;
    };
  }, []);

  const errorMessage = useMemo(
    () => biometricError ?? formatApiError(error, signInFallback),
    [biometricError, error, signInFallback],
  );

  const refreshBiometricState = async () => {
    const status = await getBiometricStatus();
    setBiometricKind(status.kind);
    setHasBiometricCredentials(status.isAvailable && status.hasSavedCredentials);
    setBiometricReady(status.isAvailable);
  };

  const handleCredentialLogin = async (values: Record<string, string>) => {
    setBiometricError(null);

    try {
      await login({
        email: values.email,
        password: values.password,
      }).unwrap();

      await saveBiometricCredentials({
        email: values.email,
        password: values.password,
      });
      await refreshBiometricState();
    } catch {
      // Mutation state already exposes the credential error for the form.
    }
  };

  const handleBiometricLogin = async () => {
    setBiometricError(null);
    setIsBiometricLoading(true);

    try {
      const status = await getBiometricStatus();

      if (!status.isAvailable) {
        setBiometricReady(false);
        setBiometricError(t("biometricUnavailable"));
        return;
      }

      if (!status.hasSavedCredentials) {
        setHasBiometricCredentials(false);
        setBiometricError(t("biometricMissingCredentials"));
        return;
      }

      const result = await authenticateWithBiometrics({
        cancelLabel: t("biometricCancel"),
        fallbackLabel: t("biometricFallback"),
        promptMessage: t("biometricPrompt", { method: methodLabelMap[status.kind] }),
      });

      if (!result.success) {
        if (
          result.error === "app_cancel" ||
          result.error === "system_cancel" ||
          result.error === "user_cancel"
        ) {
          return;
        }

        if (result.error === "not_enrolled" || result.error === "passcode_not_set") {
          setBiometricError(t("biometricUnavailable"));
          return;
        }

        if (result.error === "lockout") {
          setBiometricError(t("biometricLockedOut"));
          return;
        }

        setBiometricError(t("biometricFailed"));
        return;
      }

      const storedCredentials = await readBiometricCredentials();

      if (!storedCredentials) {
        setHasBiometricCredentials(false);
        setBiometricError(t("biometricMissingCredentials"));
        return;
      }

      try {
        await login(storedCredentials).unwrap();
      } catch {
        await clearBiometricCredentials();
        setHasBiometricCredentials(false);
        setBiometricError(t("biometricSavedCredentialsExpired"));
      }
    } finally {
      setIsBiometricLoading(false);
    }
  };

  return (
    <Screen backHref="/(public)/landing" showBackButton>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AuthForm
          ctaLabel={t("login")}
          errorMessage={biometricError ?? (error ? errorMessage : null)}
          fields={[
            {
              keyboardType: "email-address",
              label: t("email"),
              name: "email",
              placeholder: "maya@orbitops.app",
            },
            {
              label: t("password"),
              name: "password",
              placeholder: "orbit-55",
              secureTextEntry: true,
            },
          ]}
          footer={
            <View className="gap-3">
              {biometricReady && hasBiometricCredentials ? (
                <Button
                  disabled={isLoading || isBiometricLoading}
                  label={t("biometricLogin", { method: biometricMethodLabel })}
                  onPress={() => {
                    void handleBiometricLogin();
                  }}
                  variant="secondary"
                />
              ) : null}
              {biometricReady && !hasBiometricCredentials ? (
                <AppText tone="muted" variant="caption">
                  {t("biometricSetupHint", { method: biometricMethodLabel })}
                </AppText>
              ) : null}
              <AppText tone="muted" variant="caption">
                {t("demo", {
                  email: DEMO_CREDENTIALS.email,
                  password: DEMO_CREDENTIALS.password,
                })}
              </AppText>
              <Link asChild href="/(auth)/forgot-password">
                <Button label={t("forgotPassword")} variant="secondary" />
              </Link>
              <Link asChild href="/(auth)/register">
                <Button label={t("createAccount")} variant="ghost" />
              </Link>
            </View>
          }
          initialValues={{
            email: DEMO_CREDENTIALS.email,
            password: DEMO_CREDENTIALS.password,
          }}
          isLoading={isLoading || isBiometricLoading}
          onSubmit={(values) => {
            void handleCredentialLogin(values);
          }}
          subtitle={t("loginSubtitle")}
          title={t("loginTitle")}
        />
      </ScrollView>
    </Screen>
  );
}
