import { useEffect, useState } from "react";
import { View } from "react-native";
import { ErrorView } from "@/components/feedback/ErrorView";
import { Button } from "@/components/ui/Button";
import { Surface } from "@/components/ui/Surface";
import { AppText } from "@/components/ui/Text";
import { useSession } from "@/features/auth/hooks/useSession";
import {
  nativeSdk,
  type NativeSdkProfile,
} from "@/features/native-sdk/lib/nativeSdk";
import { useLanguage } from "@/hooks/useLanguage";

const DetailRow = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <View>
      <AppText tone="muted" variant="caption">
        {label}
      </AppText>
      <AppText className="mt-1" variant="body">
        {value}
      </AppText>
    </View>
  );
};

export const NativeSdkCard = () => {
  const { session } = useSession();
  const { t } = useLanguage("home");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<NativeSdkProfile | null>(null);
  const [token, setToken] = useState("");

  const seed = session?.user.name ?? "guest";

  const loadNativeSdk = async () => {
    setLoading(true);
    setError("");

    try {
      const [nativeProfile, nativeToken] = await Promise.all([
        nativeSdk.getSdkProfile(),
        nativeSdk.createSessionToken(seed),
      ]);

      setProfile(nativeProfile);
      setToken(nativeToken);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : t("nativeSdkUnavailableMessage", { ns: "home" }),
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadNativeSdk();
  }, [seed]);

  return (
    <Surface className="mt-8 rounded-[28px] p-5">
      <AppText variant="subtitle">{t("nativeSdkTitle", { ns: "home" })}</AppText>
      <AppText className="mt-2" tone="muted" variant="body">
        {t("nativeSdkSubtitle", { ns: "home" })}
      </AppText>

      {error ? (
        <View className="mt-4">
          <ErrorView message={error} />
        </View>
      ) : null}

      {loading && !profile ? (
        <AppText className="mt-4" tone="muted" variant="body">
          {t("nativeSdkLoading", { ns: "home" })}
        </AppText>
      ) : null}

      {profile ? (
        <View className="mt-5 gap-4">
          <DetailRow
            label={t("nativeSdkAppLabel", { ns: "home" })}
            value={`${profile.appName} (${profile.appId})`}
          />
          <DetailRow
            label={t("nativeSdkDeviceLabel", { ns: "home" })}
            value={profile.deviceModel}
          />
          <DetailRow
            label={t("nativeSdkPlatformLabel", { ns: "home" })}
            value={`${profile.platformName} ${profile.platformVersion}`}
          />
          <DetailRow
            label={t("nativeSdkVersionLabel", { ns: "home" })}
            value={`${profile.nativeSdkName} ${profile.nativeSdkVersion}`}
          />
          <DetailRow
            label={t("nativeSdkTokenLabel", { ns: "home" })}
            value={token}
          />
        </View>
      ) : null}

      <View className="mt-5">
        <Button
          disabled={loading}
          label={t("nativeSdkRefresh", { ns: "home" })}
          onPress={() => {
            void loadNativeSdk();
          }}
          variant="secondary"
        />
      </View>
    </Surface>
  );
};
