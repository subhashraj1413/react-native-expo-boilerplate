import { Link } from "expo-router";
import { useMemo, useState } from "react";
import { ScrollView, View } from "react-native";
import { AuthForm } from "@/features/auth/components/AuthForm";
import { useForgotPasswordMutation } from "@/features/auth/api/auth.api";
import { Screen } from "@/components/ui/Screen";
import { Button } from "@/components/ui/Button";
import { AppText } from "@/components/ui/Text";
import { formatApiError } from "@/utils/format";

export default function ForgotPasswordScreen() {
  const [forgotPassword, { error, isLoading }] = useForgotPasswordMutation();
  const [successMessage, setSuccessMessage] = useState("");

  const errorMessage = useMemo(
    () => formatApiError(error, "Unable to send reset email."),
    [error],
  );

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="py-10">
          <AuthForm
            ctaLabel="Send reset link"
            errorMessage={error ? errorMessage : null}
            fields={[
              {
                keyboardType: "email-address",
                label: "Email",
                name: "email",
                placeholder: "maya@orbitops.app",
              },
            ]}
            footer={
              <View className="gap-3">
                {successMessage ? (
                  <AppText tone="accent" variant="body">
                    {successMessage}
                  </AppText>
                ) : null}
                <Link asChild href="/(auth)/login">
                  <Button label="Back to login" variant="secondary" />
                </Link>
              </View>
            }
            isLoading={isLoading}
            onSubmit={(values) => {
              void forgotPassword({
                email: values.email,
              })
                .unwrap()
                .then((result) => {
                  setSuccessMessage(result.message);
                })
                .catch(() => undefined);
            }}
            subtitle="Side routes like password recovery now have a dedicated file instead of being conditionally rendered inside a login screen."
            title="Reset your password"
          />
        </View>
      </ScrollView>
    </Screen>
  );
}
