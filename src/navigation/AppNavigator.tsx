import {
  DarkTheme,
  NavigationContainer,
  type Theme,
} from "@react-navigation/native";
import {
  createNativeStackNavigator,
  type NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { useState } from "react";
import type { JSX } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Counter } from "../features/counter/Counter";
import {
  clearAuthError,
  demoCredentials,
  selectAuthError,
  selectIsAuthenticated,
  selectProfile,
  signIn,
  signOut,
} from "../features/auth/authSlice";
import { ChatWorkspaceScreen } from "../features/chat/ChatWorkspaceScreen";
import {
  insightMetrics,
  routeCards,
  timeline,
  type RouteCard,
} from "../features/chat/sampleData";
import { Quotes } from "../features/quotes/Quotes";
import type { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

const navTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: "#07111F",
    border: "rgba(255, 255, 255, 0.08)",
    card: "#0A1424",
    primary: "#6BE8C3",
    text: "#F5F7FB",
  },
};

const colors = {
  accent: "#6BE8C3",
  accentMuted: "rgba(107, 232, 195, 0.12)",
  background: "#07111F",
  border: "rgba(175, 213, 255, 0.14)",
  card: "rgba(10, 20, 36, 0.86)",
  cardStrong: "#0E1B2D",
  danger: "#FF8478",
  muted: "#93A5BC",
  stroke: "rgba(255, 255, 255, 0.08)",
  text: "#F5F7FB",
  textSoft: "#D6E0EE",
  warm: "#FFB57A",
};

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;
type InsightsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Insights"
>;
type SettingsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Settings"
>;

export const AppNavigator = (): JSX.Element => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator
        screenOptions={{
          animation: "slide_from_right",
          contentStyle: { backgroundColor: colors.background },
          headerLargeTitle: false,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "#0A1424" },
          headerTintColor: colors.text,
          headerTitleStyle: {
            color: colors.text,
            fontSize: 18,
            fontWeight: "700",
          },
        }}
      >
        {!isAuthenticated ? (
          <Stack.Screen
            component={SignInScreen}
            name="SignIn"
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              component={HomeScreen}
              name="Home"
              options={{ title: "Orbit workspace" }}
            />
            <Stack.Screen
              component={ChatWorkspaceScreen}
              name="Chat"
              options={{ title: "Chat workspace" }}
            />
            <Stack.Screen
              component={CounterScreen}
              name="Counter"
              options={{ title: "Counter lab" }}
            />
            <Stack.Screen
              component={QuotesScreen}
              name="Quotes"
              options={{ title: "Quotes feed" }}
            />
            <Stack.Screen
              component={InsightsScreen}
              name="Insights"
              options={{ title: "Workspace insights" }}
            />
            <Stack.Screen
              component={SettingsScreen}
              name="Settings"
              options={{ title: "Settings" }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const SignInScreen = () => {
  const dispatch = useAppDispatch();
  const authError = useAppSelector(selectAuthError);
  const [email, setEmail] = useState<string>(demoCredentials.email);
  const [password, setPassword] = useState<string>(demoCredentials.password);

  const handleChangeEmail = (value: string) => {
    dispatch(clearAuthError());
    setEmail(value);
  };

  const handleChangePassword = (value: string) => {
    dispatch(clearAuthError());
    setPassword(value);
  };

  const handleSignIn = () => {
    dispatch(signIn({ email, password }));
  };

  const fillDemoCredentials = () => {
    dispatch(clearAuthError());
    setEmail(demoCredentials.email);
    setPassword(demoCredentials.password);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: "padding", default: undefined })}
      style={styles.flex}
    >
      <View style={styles.screen}>
        <BackgroundGlow />
        <ScrollView contentContainerStyle={styles.screenContent}>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>Secure sign in</Text>
          </View>
          <Text style={styles.heroTitle}>Enter the protected workspace.</Text>
          <Text style={styles.heroSubtitle}>
            This auth screen validates credentials before the native stack
            unlocks Home, Chat, Counter, Quotes, Insights, and Settings.
          </Text>
          <View style={styles.heroCard}>
            <FieldLabel label="Workspace email" />
            <TextInput
              accessibilityLabel="Workspace email"
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={handleChangeEmail}
              placeholder="ops@orbit.ai"
              placeholderTextColor={colors.muted}
              style={styles.input}
              value={email}
            />
            <FieldLabel label="Password" />
            <TextInput
              accessibilityLabel="Workspace password"
              onChangeText={handleChangePassword}
              placeholder="launch-ready"
              placeholderTextColor={colors.muted}
              secureTextEntry
              style={styles.input}
              value={password}
            />
            {authError ? (
              <Text style={styles.errorText}>{authError}</Text>
            ) : null}
            <View style={styles.buttonColumn}>
              <ActionButton
                label="Enter workspace"
                onPress={handleSignIn}
                variant="primary"
              />
              <ActionButton
                label="Use demo credentials"
                onPress={fillDemoCredentials}
                variant="secondary"
              />
            </View>
            <Text style={styles.helperText}>
              Demo access: {demoCredentials.email} / {demoCredentials.password}
            </Text>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfile);

  return (
    <ScreenShell>
      <View style={styles.screenHeader}>
        <View style={styles.headerCopy}>
          <Text style={styles.sectionEyebrow}>{profile.workspace}</Text>
          <Text style={styles.screenTitle}>Welcome back, Maya</Text>
          <Text style={styles.screenSubtitle}>
            The protected native stack is live. Open the chat workspace or jump
            directly into the existing Counter and Quotes features.
          </Text>
        </View>
        <ActionButton
          label="Sign out"
          onPress={() => {
            dispatch(signOut());
          }}
          variant="ghost"
        />
      </View>
      <View style={styles.heroCard}>
        <Text style={styles.sectionEyebrow}>Today</Text>
        <Text style={styles.cardTitle}>
          Operations are stable and the demo stack is fully connected.
        </Text>
        <Text style={styles.cardBody}>
          Counter and Quotes are now first-class screens inside the protected
          app flow, alongside the chat workspace, insights, and settings.
        </Text>
      </View>
      <View style={styles.routeGrid}>
        {routeCards.map((card) => (
          <RouteCardView
            card={card}
            key={card.id}
            onPress={() => {
              navigation.navigate(card.route);
            }}
          />
        ))}
      </View>
    </ScreenShell>
  );
};

const CounterScreen = () => (
  <ScreenShell>
    <Text style={styles.sectionEyebrow}>Redux feature</Text>
    <Text style={styles.screenTitle}>Counter lab</Text>
    <Text style={styles.screenSubtitle}>
      This is the existing counter feature, placed on its own native stack
      screen inside the protected app.
    </Text>
    <View style={styles.featureCard}>
      <Counter />
    </View>
  </ScreenShell>
);

const QuotesScreen = () => (
  <View style={styles.screen}>
    <BackgroundGlow />
    <View style={styles.quotesScreen}>
      <View style={styles.quotesHeader}>
        <Text style={styles.sectionEyebrow}>RTK Query feature</Text>
        <Text style={styles.screenTitle}>Quotes feed</Text>
        <Text style={styles.screenSubtitle}>
          This screen renders the existing quotes feature directly inside the
          protected stack.
        </Text>
      </View>
      <View style={styles.quotesCard}>
        <Quotes />
      </View>
    </View>
  </View>
);

const InsightsScreen = ({ navigation }: InsightsScreenProps) => (
  <ScreenShell>
    <View style={styles.screenHeader}>
      <View style={styles.headerCopy}>
        <Text style={styles.sectionEyebrow}>Workspace insights</Text>
        <Text style={styles.screenTitle}>AI operations snapshot</Text>
        <Text style={styles.screenSubtitle}>
          Review current assistant metrics, then jump back into the live chat
          workspace when needed.
        </Text>
      </View>
      <ActionButton
        label="Open chat"
        onPress={() => {
          navigation.navigate("Chat");
        }}
        variant="ghost"
      />
    </View>
    <View style={styles.metricGrid}>
      {insightMetrics.map((metric) => (
        <View key={metric.id} style={styles.metricCard}>
          <Text style={styles.metricValue}>{metric.value}</Text>
          <Text style={styles.metricLabel}>{metric.label}</Text>
        </View>
      ))}
    </View>
    <View style={styles.timelineCard}>
      <Text style={styles.sectionEyebrow}>Automation timeline</Text>
      {timeline.map((item) => (
        <View key={item.id} style={styles.timelineItem}>
          <Text style={styles.timelineTime}>{item.time}</Text>
          <View style={styles.timelineCopy}>
            <Text style={styles.timelineTitle}>{item.title}</Text>
            <Text style={styles.timelineSummary}>{item.summary}</Text>
          </View>
        </View>
      ))}
    </View>
  </ScreenShell>
);

const SettingsScreen = ({ navigation }: SettingsScreenProps) => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfile);

  return (
    <ScreenShell>
      <View style={styles.screenHeader}>
        <View style={styles.headerCopy}>
          <Text style={styles.sectionEyebrow}>Workspace settings</Text>
          <Text style={styles.screenTitle}>Access and presets</Text>
          <Text style={styles.screenSubtitle}>
            Sample settings for the protected flow, plus a direct sign-out
            action to return to the auth screen.
          </Text>
        </View>
        <ActionButton
          label="Open home"
          onPress={() => {
            navigation.navigate("Home");
          }}
          variant="ghost"
        />
      </View>
      <View style={styles.heroCard}>
        <Text style={styles.sectionEyebrow}>Owner</Text>
        <Text style={styles.cardTitle}>{profile.name}</Text>
        <Text style={styles.cardBody}>
          {profile.role} at {profile.workspace}
        </Text>
      </View>
      <SettingRow
        description="Native stack routes are protected behind the auth slice."
        title="Protected navigation"
        value="Enabled"
      />
      <SettingRow
        description="Demo credentials are required before stack screens are shown."
        title="Sign-in validation"
        value="Active"
      />
      <SettingRow
        description="Counter and Quotes are mounted as their own screens."
        title="Feature integration"
        value="Connected"
      />
      <View style={styles.compactRow}>
        <ActionButton
          label="Sign out"
          onPress={() => {
            dispatch(signOut());
          }}
          variant="primary"
        />
      </View>
    </ScreenShell>
  );
};

const ScreenShell = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => (
  <View style={styles.screen}>
    <BackgroundGlow />
    <ScrollView contentContainerStyle={styles.screenContent}>
      {children}
    </ScrollView>
  </View>
);

const BackgroundGlow = () => (
  <View pointerEvents="none" style={StyleSheet.absoluteFill}>
    <View style={styles.glowTop} />
    <View style={styles.glowMiddle} />
    <View style={styles.grid} />
  </View>
);

const RouteCardView = ({
  card,
  onPress,
}: {
  card: RouteCard;
  onPress: () => void;
}) => (
  <Pressable
    accessibilityRole="button"
    onPress={onPress}
    style={styles.routeCard}
  >
    <Text style={styles.sectionEyebrow}>Protected route</Text>
    <Text style={styles.routeTitle}>{card.title}</Text>
    <Text style={styles.routeBody}>{card.description}</Text>
  </Pressable>
);

const ActionButton = ({
  label,
  onPress,
  variant,
}: {
  label: string;
  onPress: () => void;
  variant: "ghost" | "primary" | "secondary";
}) => (
  <Pressable
    accessibilityLabel={label}
    accessibilityRole="button"
    onPress={onPress}
    style={[
      styles.button,
      variant === "primary" && styles.buttonPrimary,
      variant === "secondary" && styles.buttonSecondary,
      variant === "ghost" && styles.buttonGhost,
    ]}
  >
    <Text
      style={[
        styles.buttonText,
        variant === "ghost" && styles.buttonTextGhost,
        variant === "secondary" && styles.buttonTextSecondary,
      ]}
    >
      {label}
    </Text>
  </Pressable>
);

const FieldLabel = ({ label }: { label: string }) => (
  <Text style={styles.fieldLabel}>{label}</Text>
);

const SettingRow = ({
  description,
  title,
  value,
}: {
  description: string;
  title: string;
  value: string;
}) => (
  <View style={styles.settingRow}>
    <View style={styles.settingCopy}>
      <Text style={styles.settingTitle}>{title}</Text>
      <Text style={styles.settingDescription}>{description}</Text>
    </View>
    <View style={styles.settingValuePill}>
      <Text style={styles.settingValueText}>{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: 18,
    justifyContent: "center",
    minHeight: 50,
    minWidth: 126,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  buttonColumn: {
    gap: 12,
    marginTop: 16,
  },
  buttonGhost: {
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderColor: colors.stroke,
    borderWidth: 1,
  },
  buttonPrimary: {
    backgroundColor: colors.accent,
  },
  buttonSecondary: {
    backgroundColor: colors.accentMuted,
    borderColor: "rgba(107, 232, 195, 0.28)",
    borderWidth: 1,
  },
  buttonText: {
    color: colors.background,
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
  buttonTextGhost: {
    color: colors.text,
  },
  buttonTextSecondary: {
    color: colors.text,
  },
  cardBody: {
    color: colors.textSoft,
    fontSize: 15,
    lineHeight: 23,
    marginTop: 10,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 26,
    fontWeight: "700",
    letterSpacing: 0.2,
    lineHeight: 32,
    marginTop: 8,
  },
  compactRow: {
    marginTop: 16,
  },
  errorText: {
    color: colors.danger,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 14,
  },
  featureCard: {
    alignItems: "center",
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 32,
    borderWidth: 1,
    marginTop: 18,
    padding: 20,
  },
  fieldLabel: {
    color: colors.textSoft,
    fontSize: 13,
    letterSpacing: 1,
    marginBottom: 8,
    marginTop: 14,
    textTransform: "uppercase",
  },
  flex: {
    flex: 1,
  },
  glowMiddle: {
    backgroundColor: "rgba(255, 181, 122, 0.12)",
    borderRadius: 220,
    height: 280,
    position: "absolute",
    right: -80,
    top: 320,
    width: 280,
  },
  glowTop: {
    backgroundColor: "rgba(107, 232, 195, 0.16)",
    borderRadius: 220,
    height: 260,
    left: -50,
    position: "absolute",
    top: -30,
    width: 260,
  },
  grid: {
    borderColor: "rgba(255, 255, 255, 0.03)",
    borderWidth: 1,
    bottom: 24,
    left: 24,
    position: "absolute",
    right: 24,
    top: 24,
  },
  headerCopy: {
    flex: 1,
    minWidth: 220,
  },
  helperText: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 16,
  },
  heroBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255, 255, 255, 0.07)",
    borderColor: colors.stroke,
    borderRadius: 999,
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  heroBadgeText: {
    color: colors.textSoft,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  heroCard: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 32,
    borderWidth: 1,
    marginBottom: 18,
    padding: 24,
  },
  heroSubtitle: {
    color: colors.textSoft,
    fontSize: 17,
    lineHeight: 27,
    marginBottom: 26,
    maxWidth: 720,
  },
  heroTitle: {
    color: colors.text,
    fontSize: 42,
    fontWeight: "700",
    letterSpacing: -1.2,
    lineHeight: 46,
    marginBottom: 16,
    maxWidth: 760,
  },
  input: {
    backgroundColor: colors.cardStrong,
    borderColor: colors.border,
    borderRadius: 18,
    borderWidth: 1,
    color: colors.text,
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  metricCard: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 24,
    borderWidth: 1,
    flexBasis: "47%",
    flexGrow: 1,
    minHeight: 128,
    minWidth: 140,
    padding: 20,
  },
  metricGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
    marginTop: 18,
  },
  metricLabel: {
    color: colors.textSoft,
    fontSize: 13,
    letterSpacing: 0.7,
    marginTop: 10,
    textTransform: "uppercase",
  },
  metricValue: {
    color: colors.text,
    fontSize: 31,
    fontWeight: "700",
  },
  quotesCard: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 28,
    borderWidth: 1,
    flex: 1,
    marginTop: 18,
    overflow: "hidden",
    paddingVertical: 8,
  },
  quotesHeader: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  quotesScreen: {
    backgroundColor: colors.background,
    flex: 1,
    paddingBottom: 20,
  },
  routeBody: {
    color: colors.textSoft,
    fontSize: 14,
    lineHeight: 22,
    marginTop: 10,
  },
  routeCard: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 26,
    borderWidth: 1,
    flexGrow: 1,
    minHeight: 178,
    minWidth: 180,
    padding: 20,
  },
  routeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
  },
  routeTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "700",
    marginTop: 8,
  },
  screen: {
    backgroundColor: colors.background,
    flex: 1,
  },
  screenContent: {
    padding: 20,
    paddingBottom: 40,
  },
  screenHeader: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "space-between",
    marginBottom: 24,
  },
  screenSubtitle: {
    color: colors.textSoft,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
    maxWidth: 680,
  },
  screenTitle: {
    color: colors.text,
    fontSize: 34,
    fontWeight: "700",
    letterSpacing: -0.7,
    lineHeight: 40,
    marginTop: 8,
  },
  sectionEyebrow: {
    color: colors.warm,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.4,
    textTransform: "uppercase",
  },
  settingCopy: {
    flex: 1,
    minWidth: 180,
  },
  settingDescription: {
    color: colors.textSoft,
    fontSize: 14,
    lineHeight: 22,
    marginTop: 6,
  },
  settingRow: {
    alignItems: "center",
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 24,
    borderWidth: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
    justifyContent: "space-between",
    marginBottom: 14,
    padding: 20,
  },
  settingTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "700",
  },
  settingValuePill: {
    backgroundColor: colors.accentMuted,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  settingValueText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "700",
  },
  timelineCard: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 28,
    borderWidth: 1,
    marginTop: 18,
    padding: 22,
  },
  timelineCopy: {
    flex: 1,
    minWidth: 180,
  },
  timelineItem: {
    borderTopColor: colors.stroke,
    borderTopWidth: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
    marginTop: 16,
    paddingTop: 16,
  },
  timelineSummary: {
    color: colors.textSoft,
    fontSize: 14,
    lineHeight: 22,
    marginTop: 6,
  },
  timelineTime: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.1,
    minWidth: 86,
    paddingTop: 3,
    textTransform: "uppercase",
  },
  timelineTitle: {
    color: colors.text,
    fontSize: 19,
    fontWeight: "700",
  },
});
