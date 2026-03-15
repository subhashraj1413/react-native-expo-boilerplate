import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function ProtectedTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: "#07131C" },
        tabBarActiveTintColor: "#81F3D0",
        tabBarInactiveTintColor: "#6A7F95",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginBottom: 8,
        },
        tabBarStyle: {
          backgroundColor: "rgba(16, 33, 49, 0.97)",
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
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              color={color}
              name={focused ? "home" : "home-outline"}
              size={22}
            />
          ),
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              color={color}
              name={focused ? "search" : "search-outline"}
              size={22}
            />
          ),
          title: "Search",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              color={color}
              name={focused ? "person" : "person-outline"}
              size={22}
            />
          ),
          title: "Profile",
        }}
      />
    </Tabs>
  );
}
