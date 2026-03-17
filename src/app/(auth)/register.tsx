import { Link } from "expo-router";
import { useMemo } from "react";
import { ScrollView, View } from "react-native";
import { useRegisterMutation } from "@/features/auth/api/auth.api";
import { AuthForm } from "@/features/auth/components/AuthForm";
import { Screen } from "@/components/ui/Screen";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/hooks/useLanguage";
import { formatApiError } from "@/utils/format";

export default function RegisterScreen() {
  const [register, { error, isLoading }] = useRegisterMutation();
  const { t } = useLanguage("auth");
  const registerFallback = t("registerUnable");

  const errorMessage = useMemo(
    () => formatApiError(error, registerFallback),
    [error, registerFallback],
  );

  return (
    <Screen backHref="/(auth)/login" showBackButton>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="pb-10">
          <AuthForm
            ctaLabel={t("createWorkspace")}
            errorMessage={error ? errorMessage : null}
            fields={[
              {
                autoCapitalize: "words",
                label: t("fullName"),
                name: "fullName",
                placeholder: "Maya Chen",
              },
              {
                keyboardType: "email-address",
                label: t("email"),
                name: "email",
                placeholder: "maya@orbitops.app",
              },
              {
                label: t("password"),
                name: "password",
                placeholder: "Minimum 6 characters",
                secureTextEntry: true,
              },
            ]}
            footer={
              <Link asChild href="/(auth)/login">
                <Button label={t("backToLogin")} variant="secondary" />
              </Link>
            }
            isLoading={isLoading}
            onSubmit={(values) => {
              void register({
                email: values.email,
                fullName: values.fullName,
                password: values.password,
              });
            }}
            subtitle={t("registerSubtitle")}
            title={t("registerTitle")}
          />
        </View>
      </ScrollView>
    </Screen>
  );
}
