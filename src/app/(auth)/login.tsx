import { Link } from "expo-router";
import { useMemo } from "react";
import { ScrollView, View } from "react-native";
import { DEMO_CREDENTIALS } from "@/constants/env";
import { AuthForm } from "@/features/auth/components/AuthForm";
import { useLoginMutation } from "@/features/auth/api/auth.api";
import { Screen } from "@/components/ui/Screen";
import { AppText } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { formatApiError } from "@/utils/format";

export default function LoginScreen() {
  const [login, { error, isLoading }] = useLoginMutation();

  const errorMessage = useMemo(
    () => formatApiError(error, "Unable to sign in."),
    [error],
  );

  return (
    <Screen backHref="/(public)/landing" showBackButton>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AuthForm
          ctaLabel="Login"
          errorMessage={error ? errorMessage : null}
          fields={[
            {
              keyboardType: "email-address",
              label: "Email",
              name: "email",
              placeholder: "maya@orbitops.app",
            },
            {
              label: "Password",
              name: "password",
              placeholder: "orbit-55",
              secureTextEntry: true,
            },
          ]}
          footer={
            <View className="gap-3">
              <AppText tone="muted" variant="caption">
                Demo: {DEMO_CREDENTIALS.email} / {DEMO_CREDENTIALS.password}
              </AppText>
              <Link asChild href="/(auth)/forgot-password">
                <Button label="Forgot password" variant="secondary" />
              </Link>
              <Link asChild href="/(auth)/register">
                <Button label="Create account" variant="ghost" />
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
          subtitle="This screen stays narrow in responsibility: collect credentials, run the mutation, and let the surrounding providers handle the session."
          title="Welcome back"
        />
      </ScrollView>
    </Screen>
  );
}
