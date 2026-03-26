import { NativeModules, Platform } from "react-native";

export type NativeSdkProfile = {
  appId: string;
  appName: string;
  deviceModel: string;
  nativeSdkName: string;
  nativeSdkVersion: string;
  platformName: string;
  platformVersion: string;
};

type NativeSdkModule = {
  createSessionToken(seed: string): Promise<string>;
  getSdkProfile(): Promise<NativeSdkProfile>;
};

const nativeSdkModule = NativeModules.NativeSdk as NativeSdkModule | undefined;

const getNativeSdkModule = (): NativeSdkModule => {
  if (!nativeSdkModule) {
    throw new Error(
      `NativeSdk is not available on ${Platform.OS}. Rebuild the native app to load the sample SDK.`,
    );
  }

  return nativeSdkModule;
};

export const nativeSdk = {
  createSessionToken(seed: string) {
    return getNativeSdkModule().createSessionToken(seed);
  },
  getSdkProfile() {
    return getNativeSdkModule().getSdkProfile();
  },
};
