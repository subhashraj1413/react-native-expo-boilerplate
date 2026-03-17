import { Link } from "expo-router";
import { useMemo, useState } from "react";
import { ScrollView, View } from "react-native";
import { AuthForm } from "@/features/auth/components/AuthForm";
import { useForgotPasswordMutation } from "@/features/auth/api/auth.api";
import { Screen } from "@/components/ui/Screen";
import { Button } from "@/components/ui/Button";
import { AppText } from "@/components/ui/Text";
import { useLanguage } from "@/hooks/useLanguage";
import { formatApiError } from "@/utils/format";

export default function ForgotPasswordScreen() {
  const [forgotPassword, { error, isLoading }] = useForgotPasswordMutation();
  const [successMessage, setSuccessMessage] = useState("");
  const { t } = useLanguage("auth");
  const forgotFallback = t("forgotUnable");

  const errorMessage = useMemo(
    () => formatApiError(error, forgotFallback),
    [error, forgotFallback],
  );

  return (
    <Screen backHref="/(auth)/login" showBackButton>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="pb-10">
          <AuthForm
            ctaLabel={t("resetLink")}
            errorMessage={error ? errorMessage : null}
            fields={[
              {
                keyboardType: "email-address",
                label: t("email"),
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
                  <Button label={t("backToLogin")} variant="secondary" />
                </Link>
              </View>
            }
            isLoading={isLoading}
            onSubmit={(values) => {
              void forgotPassword({
                email: values.email,
              })
                .unwrap()
                .then(() => {
                  setSuccessMessage(t("successReset"));
                })
                .catch(() => undefined);
            }}
            subtitle={t("forgotSubtitle")}
            title={t("forgotTitle")}
          />
        </View>
      </ScrollView>
    </Screen>
  );
}
