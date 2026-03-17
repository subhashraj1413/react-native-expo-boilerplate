import { Link } from "expo-router";
import { useMemo } from "react";
import { ScrollView, View } from "react-native";
import { DEMO_CREDENTIALS } from "@/constants/env";
import { AuthForm } from "@/features/auth/components/AuthForm";
import { useLoginMutation } from "@/features/auth/api/auth.api";
import { Screen } from "@/components/ui/Screen";
import { AppText } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/hooks/useLanguage";
import { formatApiError } from "@/utils/format";

export default function LoginScreen() {
  const [login, { error, isLoading }] = useLoginMutation();
  const { t } = useLanguage("auth");
  const signInFallback = t("signInUnable");

  const errorMessage = useMemo(
    () => formatApiError(error, signInFallback),
    [error, signInFallback],
  );

  return (
    <Screen backHref="/(public)/landing" showBackButton>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AuthForm
          ctaLabel={t("login")}
          errorMessage={error ? errorMessage : null}
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
          isLoading={isLoading}
          onSubmit={(values) => {
            void login({
              email: values.email,
              password: values.password,
            });
          }}
          subtitle={t("loginSubtitle")}
          title={t("loginTitle")}
        />
      </ScrollView>
    </Screen>
  );
}
