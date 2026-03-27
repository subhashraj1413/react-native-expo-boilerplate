import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import type { LoginPayload } from "@/features/auth/types/auth.types";

export type BiometricKind = "face" | "fingerprint" | "iris" | "unknown";

export type BiometricStatus = {
  hasSavedCredentials: boolean;
  isAvailable: boolean;
  kind: BiometricKind;
};

const BIOMETRIC_CREDENTIALS_KEY = "auth.biometric.credentials";
const BIOMETRIC_KEYCHAIN_SERVICE = "react-native-expo-boilerplate.biometric";

const secureStoreOptions: SecureStore.SecureStoreOptions = {
  keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
  keychainService: BIOMETRIC_KEYCHAIN_SERVICE,
};

const isSupportedPlatform = Platform.OS === "android" || Platform.OS === "ios";

const resolveBiometricKind = (
  types: LocalAuthentication.AuthenticationType[],
): BiometricKind => {
  if (types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
    return "face";
  }

  if (types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
    return "fingerprint";
  }

  if (types.includes(LocalAuthentication.AuthenticationType.IRIS)) {
    return "iris";
  }

  return "unknown";
};

export const saveBiometricCredentials = async (payload: LoginPayload) => {
  if (!isSupportedPlatform) {
    return;
  }

  await SecureStore.setItemAsync(
    BIOMETRIC_CREDENTIALS_KEY,
    JSON.stringify({
      email: payload.email.trim(),
      password: payload.password,
    }),
    secureStoreOptions,
  );
};

export const readBiometricCredentials = async (): Promise<LoginPayload | null> => {
  if (!isSupportedPlatform) {
    return null;
  }

  const stored = await SecureStore.getItemAsync(
    BIOMETRIC_CREDENTIALS_KEY,
    secureStoreOptions,
  );

  if (!stored) {
    return null;
  }

  try {
    return JSON.parse(stored) as LoginPayload;
  } catch {
    await clearBiometricCredentials();
    return null;
  }
};

export const clearBiometricCredentials = async () => {
  if (!isSupportedPlatform) {
    return;
  }

  await SecureStore.deleteItemAsync(BIOMETRIC_CREDENTIALS_KEY, secureStoreOptions);
};

export const getBiometricStatus = async (): Promise<BiometricStatus> => {
  if (!isSupportedPlatform) {
    return {
      hasSavedCredentials: false,
      isAvailable: false,
      kind: "unknown",
    };
  }

  const [savedCredentials, secureStoreAvailable, hasHardware, isEnrolled, supportedTypes] =
    await Promise.all([
      readBiometricCredentials(),
      SecureStore.isAvailableAsync(),
      LocalAuthentication.hasHardwareAsync(),
      LocalAuthentication.isEnrolledAsync(),
      LocalAuthentication.supportedAuthenticationTypesAsync(),
    ]);

  return {
    hasSavedCredentials: Boolean(savedCredentials),
    isAvailable: secureStoreAvailable && hasHardware && isEnrolled,
    kind: resolveBiometricKind(supportedTypes),
  };
};

export const authenticateWithBiometrics = async (options: {
  cancelLabel: string;
  fallbackLabel: string;
  promptMessage: string;
}) => {
  if (!isSupportedPlatform) {
    return {
      success: false as const,
      error: "not_available" as const,
    };
  }

  return LocalAuthentication.authenticateAsync({
    biometricsSecurityLevel: "strong",
    cancelLabel: options.cancelLabel,
    disableDeviceFallback: false,
    fallbackLabel: options.fallbackLabel,
    promptMessage: options.promptMessage,
  });
};
