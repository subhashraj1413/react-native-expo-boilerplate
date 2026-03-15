import "../../global.css";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AppProvider } from "../providers/AppProvider";
import { palette } from "../constants/colors";

export default function RootLayout() {
  return (
    <AppProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: palette.ink },
          headerShown: false,
        }}
      >
        <Stack.Screen name="(public)" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(protected)" />
        <Stack.Screen
          name="modal"
          options={{
            animation: "slide_from_bottom",
            presentation: "modal",
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
    </AppProvider>
  );
}
