import { useState } from "react";
import type { ReactNode } from "react";
import type { KeyboardTypeOptions } from "react-native";
import { View } from "react-native";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { Surface } from "../../../components/ui/Surface";
import { AppText } from "../../../components/ui/Text";
import { ErrorView } from "../../../components/feedback/ErrorView";

export type AuthField = {
  autoCapitalize?: "characters" | "none" | "sentences" | "words";
  keyboardType?: KeyboardTypeOptions;
  label: string;
  name: string;
  placeholder: string;
  secureTextEntry?: boolean;
};

type AuthFormProps = {
  ctaLabel: string;
  errorMessage?: string | null;
  fields: AuthField[];
  footer?: ReactNode;
  initialValues?: Record<string, string>;
  isLoading?: boolean;
  onSubmit: (values: Record<string, string>) => void;
  subtitle: string;
  title: string;
};

export const AuthForm = ({
  ctaLabel,
  errorMessage,
  fields,
  footer,
  initialValues = {},
  isLoading = false,
  onSubmit,
  subtitle,
  title,
}: AuthFormProps) => {
  const [values, setValues] = useState<Record<string, string>>(() =>
    fields.reduce<Record<string, string>>((result, field) => {
      result[field.name] = initialValues[field.name] ?? "";
      return result;
    }, {}),
  );

  return (
    <Surface className="rounded-[30px] p-6">
      <AppText variant="eyebrow">Auth flow</AppText>
      <AppText className="mt-3" variant="title">
        {title}
      </AppText>
      <AppText className="mt-3" tone="muted" variant="body">
        {subtitle}
      </AppText>

      <View className="mt-6 gap-4">
        {fields.map((field) => (
          <Input
            autoCapitalize={field.autoCapitalize ?? "none"}
            key={field.name}
            keyboardType={field.keyboardType}
            label={field.label}
            onChangeText={(value) => {
              setValues((current) => ({
                ...current,
                [field.name]: value,
              }));
            }}
            placeholder={field.placeholder}
            secureTextEntry={field.secureTextEntry}
            value={values[field.name]}
          />
        ))}
      </View>

      {errorMessage ? (
        <View className="mt-5">
          <ErrorView message={errorMessage} />
        </View>
      ) : null}

      <View className="mt-6 gap-4">
        <Button
          label={isLoading ? "Working..." : ctaLabel}
          onPress={() => {
            onSubmit(values);
          }}
        />
        {footer}
      </View>
    </Surface>
  );
};
