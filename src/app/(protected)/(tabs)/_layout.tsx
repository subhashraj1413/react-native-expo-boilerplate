import { Ionicons } from "@expo/vector-icons";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { Tabs } from "expo-router";
import { HeaderAiButton } from "@/components/navigation/HeaderAiButton";
import { useLanguage } from "@/hooks/useLanguage";
import { useTheme } from "@/hooks/useTheme";

export default function ProtectedTabsLayout() {
  const { t } = useLanguage("tabs");
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerLeft: props => (
          <DrawerToggleButton {...props} tintColor={theme.primaryText} />
        ),
        headerRight: () => <HeaderAiButton />,
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: theme.background,
        },
        headerTintColor: theme.primaryText,
        sceneStyle: { backgroundColor: theme.background },
        tabBarActiveTintColor: theme.accent,
        tabBarInactiveTintColor: theme.secondaryText,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginBottom: 8,
        },
        tabBarStyle: {
          backgroundColor: theme.tabBar,
          borderTopWidth: 0,
          borderRadius: 28,
          bottom: 18,
          height: 78,
          left: 16,
          position: "absolute",
          right: 16,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerTitle: t("home"),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              color={color}
              name={focused ? "home" : "home-outline"}
              size={22}
            />
          ),
          title: t("home"),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerTitle: t("search"),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              color={color}
              name={focused ? "search" : "search-outline"}
              size={22}
            />
          ),
          title: t("search"),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: t("profile"),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              color={color}
              name={focused ? "person" : "person-outline"}
              size={22}
            />
          ),
          title: t("profile"),
        }}
      />
    </Tabs>
  );
}
