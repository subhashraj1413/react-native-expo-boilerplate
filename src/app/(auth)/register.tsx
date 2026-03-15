import { Link } from "expo-router";
import { useMemo } from "react";
import { ScrollView, View } from "react-native";
import { useRegisterMutation } from "@/features/auth/api/auth.api";
import { AuthForm } from "@/features/auth/components/AuthForm";
import { Screen } from "@/components/ui/Screen";
import { Button } from "@/components/ui/Button";
import { formatApiError } from "@/utils/format";

export default function RegisterScreen() {
  const [register, { error, isLoading }] = useRegisterMutation();

  const errorMessage = useMemo(
    () => formatApiError(error, "Unable to register."),
    [error],
  );

  return (
    <Screen backHref="/(auth)/login" showBackButton>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="pb-10">
          <AuthForm
            ctaLabel="Create workspace"
            errorMessage={error ? errorMessage : null}
            fields={[
              {
                autoCapitalize: "words",
                label: "Full name",
                name: "fullName",
                placeholder: "Maya Chen",
              },
              {
                keyboardType: "email-address",
                label: "Email",
                name: "email",
                placeholder: "maya@orbitops.app",
              },
              {
                label: "Password",
                name: "password",
                placeholder: "Minimum 6 characters",
                secureTextEntry: true,
              },
            ]}
            footer={
              <Link asChild href="/(auth)/login">
                <Button label="Back to login" variant="secondary" />
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
            subtitle="Registration lives in the auth module as a sibling route, not inside one giant screen component."
            title="Create a new account"
          />
        </View>
      </ScrollView>
    </Screen>
  );
}
