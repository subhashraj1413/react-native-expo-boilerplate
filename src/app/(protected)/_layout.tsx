import { Ionicons } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItemList,
  type DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { Redirect, usePathname, useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { ActivityIndicator, Pressable, Switch, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HeaderAiButton } from "@/components/navigation/HeaderAiButton";
import { Screen } from "@/components/ui/Screen";
import { AppText } from "@/components/ui/Text";
import { useSession } from "@/features/auth/hooks/useSession";
import { useLanguage } from "@/hooks/useLanguage";
import { useTheme } from "@/hooks/useTheme";

const ProtectedDrawerContent = (props: DrawerContentComponentProps) => {
  const router = useRouter();
  const { session, signOut } = useSession();
  const { language, setLanguage, t } = useLanguage([
    "ai",
    "common",
    "drawer",
    "theme",
  ]);
  const { mode, theme, toggleTheme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        backgroundColor: theme.background,
        flex: 1,
        paddingBottom: Math.max(insets.bottom, 16),
        paddingHorizontal: 16,
        paddingTop: Math.max(insets.top, 16),
      }}
    >
      <View className="px-2 pb-5 pt-2">
        <AppText variant="eyebrow">{t("protectedArea", { ns: "drawer" })}</AppText>
        <AppText className="mt-3" variant="subtitle">
          {session?.user.name ?? t("workspace", { ns: "common" })}
        </AppText>
        <AppText className="mt-2" tone="muted" variant="body">
          {t("signedInAs", { email: session?.user.email ?? "", ns: "drawer" })}
        </AppText>
      </View>

      <View
        style={{
          backgroundColor: theme.border,
          height: 1,
          marginBottom: 12,
          marginHorizontal: 8,
        }}
      />

      <DrawerItemList {...props} />

      <View
        className="mt-auto px-2 pb-4 pt-6"
        style={{
          borderTopColor: theme.border,
          borderTopWidth: 1,
        }}
      >
        <AppText className="mb-3" tone="muted" variant="caption">
          {t("preferences", { ns: "drawer" })}
        </AppText>

        <View className="mb-2 flex-row items-center justify-between rounded-[18px] px-2 py-3">
          <View className="flex-row items-center gap-3">
            <Ionicons
              color={theme.accent}
              name={mode === "dark" ? "moon-outline" : "sunny-outline"}
              size={20}
            />
            <View>
              <AppText variant="body">{t("theme", { ns: "common" })}</AppText>
              <AppText tone="muted" variant="caption">
                {t("currentMode", {
                  mode: t(mode === "dark" ? "dark" : "light", { ns: "common" }),
                  ns: "theme",
                })}
              </AppText>
            </View>
          </View>
          <Switch
            onValueChange={toggleTheme}
            thumbColor={mode === "dark" ? theme.onAccent : theme.card}
            trackColor={{
              false: theme.accentBorder,
              true: theme.accent,
            }}
            value={mode === "dark"}
          />
        </View>

        <View className="mb-2 flex-row items-center justify-between rounded-[18px] px-2 py-3">
          <View className="flex-row items-center gap-3">
            <Ionicons color={theme.accent} name="language-outline" size={20} />
            <AppText variant="body">{t("language", { ns: "common" })}</AppText>
          </View>

          <View
            className="flex-row rounded-full p-1"
            style={{
              backgroundColor: theme.card,
              borderColor: theme.border,
              borderWidth: 1,
            }}
          >
            {(["en", "ar"] as const).map((nextLanguage) => {
              const active = language === nextLanguage;

              return (
                <Pressable
                  key={nextLanguage}
                  className="rounded-full px-3 py-2"
                  onPress={() => {
                    setLanguage(nextLanguage);
                  }}
                  style={{
                    backgroundColor: active ? theme.accentSoft : "transparent",
                  }}
                >
                  <AppText
                    style={{ color: active ? theme.accent : theme.secondaryText }}
                    variant="caption"
                  >
                    {nextLanguage === "en"
                      ? t("english", { ns: "common" })
                      : t("arabic", { ns: "common" })}
                  </AppText>
                </Pressable>
              );
            })}
          </View>
        </View>

        <Pressable
          className="flex-row items-center justify-between rounded-[18px] px-2 py-3"
          onPress={() => {
            signOut();
            router.replace("/(auth)/login");
          }}
        >
          <View className="flex-row items-center gap-3">
            <Ionicons color={theme.danger} name="log-out-outline" size={20} />
            <AppText tone="danger" variant="body">
              {t("signOut", { ns: "common" })}
            </AppText>
          </View>
          <Ionicons color={theme.secondaryText} name="chevron-forward" size={18} />
        </Pressable>
      </View>
    </DrawerContentScrollView>
  );
};

export default function ProtectedLayout() {
  const { hydrated, isAuthenticated } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const { isRTL, t } = useLanguage(["ai", "common"]);
  const { theme } = useTheme();

  if (!hydrated) {
    return (
      <Screen className="items-center justify-center">
        <ActivityIndicator color="#81F3D0" />
      </Screen>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href="/(public)/landing" />;
  }

  return (
    <Drawer
      drawerContent={props => <ProtectedDrawerContent {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: theme.accentSoft,
        drawerActiveTintColor: theme.accent,
        drawerInactiveTintColor: theme.secondaryText,
        drawerItemStyle: {
          borderRadius: 18,
          marginHorizontal: 6,
          marginVertical: 2,
          paddingHorizontal: 4,
        },
        drawerPosition: isRTL ? "right" : "left",
        drawerLabelStyle: {
          fontSize: 15,
          fontWeight: "600",
          marginLeft: 2,
        },
        drawerStyle: {
          backgroundColor: theme.background,
          width: 312,
        },
        headerRight: () => (
          <View className="mr-4 flex-row items-center gap-2">
            <HeaderAiButton disabled={pathname === "/(protected)/ai"} />
            <Pressable
              className="rounded-full p-2"
              onPress={() => {
                if (pathname === "/(protected)/settings" || pathname === "/(protected)/settings/account") {
                  router.replace("/(protected)/(tabs)/profile");
                  return;
                }

                router.replace("/(protected)/(tabs)/home");
              }}
              style={{
                backgroundColor: theme.card,
                borderColor: theme.border,
                borderWidth: 1,
              }}
            >
              <Ionicons
                color={theme.primaryText}
                name={
                  pathname === "/(protected)/settings" || pathname === "/(protected)/settings/account"
                    ? "close-outline"
                    : "home-outline"
                }
                size={20}
              />
            </Pressable>
          </View>
        ),
        headerShadowVisible: true,
        headerStyle: {
          backgroundColor: theme.background,
        },
        headerTintColor: theme.primaryText,
        sceneStyle: {
          backgroundColor: theme.background,
        },
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons color={color} name="grid-outline" size={size} />
          ),
          drawerLabel: t("workspace", { ns: "common" }),
          headerShown: false,
          title: t("workspace", { ns: "common" }),
        }}
      />
      <Drawer.Screen
        name="settings/index"
        options={{
          drawerIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons color={color} name="options-outline" size={size} />
          ),
          drawerLabel: t("settings", { ns: "common" }),
          title: t("settings", { ns: "common" }),
        }}
      />
      <Drawer.Screen
        name="settings/account"
        options={{
          drawerIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons color={color} name="person-circle-outline" size={size} />
          ),
          drawerLabel: t("account", { ns: "common" }),
          title: t("account", { ns: "common" }),
        }}
      />
      <Drawer.Screen
        name="ai"
        options={{
          drawerItemStyle: { display: "none" },
          title: t("screenTitle", { ns: "ai" }),
        }}
      />
    </Drawer>
  );
}
