import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { startTransition, useState } from "react";
import type { JSX } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import type { RootStackParamList } from "../../navigation/types";
import {
  cannedReplies,
  initialMessages,
  quickPrompts,
  type ChatMessage,
} from "./sampleData";

type ChatWorkspaceScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Chat"
>;

const colors = {
  accent: "#6BE8C3",
  accentMuted: "rgba(107, 232, 195, 0.14)",
  background: "#07111F",
  border: "rgba(175, 213, 255, 0.14)",
  card: "rgba(10, 20, 36, 0.9)",
  muted: "#93A5BC",
  text: "#F5F7FB",
  textSoft: "#D6E0EE",
  warm: "#FFB57A",
};

export const ChatWorkspaceScreen = ({
  navigation,
}: ChatWorkspaceScreenProps): JSX.Element => {
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState(initialMessages);

  const handleSendMessage = (value?: string) => {
    const content = (value ?? draft).trim();

    if (!content) {
      return;
    }

    const reply = cannedReplies[messages.length % cannedReplies.length];
    const nextMessages: ChatMessage[] = [
      ...messages,
      {
        id: `user-${String(messages.length + 1)}`,
        meta: "You now",
        role: "user",
        text: content,
      },
      {
        id: `assistant-${String(messages.length + 2)}`,
        meta: "Nova assistant now",
        role: "assistant",
        text: reply,
      },
    ];

    startTransition(() => {
      setMessages(nextMessages);
      setDraft("");
    });
  };

  return (
    <View style={styles.screen}>
      <BackgroundGlow />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>Live conversation</Text>
          <Text style={styles.title}>Nova assistant</Text>
          <Text style={styles.subtitle}>
            Continue the sample support thread, then jump to metrics or settings
            from the protected stack.
          </Text>
        </View>
        <View style={styles.actionsRow}>
          <MiniButton
            label="Open insights"
            onPress={() => {
              navigation.navigate("Insights");
            }}
          />
          <MiniButton
            label="Open settings"
            onPress={() => {
              navigation.navigate("Settings");
            }}
          />
        </View>
        <View style={styles.summaryStrip}>
          <InfoStat label="Active thread" value="Launch triage" />
          <InfoStat label="Priority" value="P1" />
          <InfoStat label="Tone" value="Calm" />
        </View>
        <View style={styles.messageList}>
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </View>
        <View style={styles.promptRow}>
          {quickPrompts.map((prompt) => (
            <Pressable
              accessibilityRole="button"
              key={prompt}
              onPress={() => {
                handleSendMessage(prompt);
              }}
              style={styles.promptChip}
            >
              <Text style={styles.promptText}>{prompt}</Text>
            </Pressable>
          ))}
        </View>
        <View style={styles.composer}>
          <TextInput
            accessibilityLabel="Chat message input"
            multiline
            onChangeText={setDraft}
            placeholder="Ask the assistant for a summary, draft, or action plan."
            placeholderTextColor={colors.muted}
            style={styles.composerInput}
            value={draft}
          />
          <Pressable
            accessibilityRole="button"
            onPress={() => {
              handleSendMessage();
            }}
            style={styles.sendButton}
          >
            <Text style={styles.sendButtonText}>Send</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

const BackgroundGlow = () => (
  <View pointerEvents="none" style={StyleSheet.absoluteFill}>
    <View style={styles.glowTop} />
    <View style={styles.glowBottom} />
  </View>
);

const MiniButton = ({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) => (
  <Pressable accessibilityRole="button" onPress={onPress} style={styles.button}>
    <Text style={styles.buttonText}>{label}</Text>
  </Pressable>
);

const MessageBubble = ({ message }: { message: ChatMessage }) => (
  <View
    style={[
      styles.messageBubble,
      message.role === "user" ? styles.messageUser : styles.messageAssistant,
    ]}
  >
    <Text style={styles.messageMeta}>{message.meta}</Text>
    <Text style={styles.messageText}>{message.text}</Text>
  </View>
);

const InfoStat = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.infoStat}>
    <Text style={styles.infoStatValue}>{value}</Text>
    <Text style={styles.infoStatLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  actionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 18,
  },
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 16,
    borderWidth: 1,
    minHeight: 46,
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  buttonText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "600",
  },
  composer: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 28,
    borderWidth: 1,
    gap: 16,
    padding: 18,
  },
  composerInput: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 22,
    maxHeight: 120,
    minHeight: 90,
    textAlignVertical: "top",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  eyebrow: {
    color: colors.warm,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.4,
    textTransform: "uppercase",
  },
  glowBottom: {
    backgroundColor: "rgba(255, 181, 122, 0.1)",
    borderRadius: 240,
    bottom: 10,
    height: 260,
    position: "absolute",
    right: -60,
    width: 260,
  },
  glowTop: {
    backgroundColor: "rgba(107, 232, 195, 0.14)",
    borderRadius: 240,
    height: 260,
    left: -50,
    position: "absolute",
    top: -20,
    width: 260,
  },
  header: {
    marginBottom: 18,
  },
  infoStat: {
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderRadius: 20,
    flex: 1,
    minWidth: 92,
    padding: 16,
  },
  infoStatLabel: {
    color: colors.muted,
    fontSize: 12,
    letterSpacing: 0.6,
    marginTop: 6,
    textTransform: "uppercase",
  },
  infoStatValue: {
    color: colors.text,
    fontSize: 19,
    fontWeight: "700",
  },
  messageAssistant: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255, 255, 255, 0.06)",
  },
  messageBubble: {
    borderRadius: 24,
    maxWidth: "92%",
    padding: 18,
  },
  messageList: {
    gap: 12,
    marginBottom: 18,
  },
  messageMeta: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.8,
    marginBottom: 8,
    textTransform: "uppercase",
  },
  messageText: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 23,
  },
  messageUser: {
    alignSelf: "flex-end",
    backgroundColor: colors.accentMuted,
    borderColor: "rgba(107, 232, 195, 0.24)",
    borderWidth: 1,
  },
  promptChip: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  promptRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 18,
  },
  promptText: {
    color: colors.textSoft,
    fontSize: 13,
    lineHeight: 18,
  },
  screen: {
    backgroundColor: colors.background,
    flex: 1,
  },
  sendButton: {
    alignItems: "center",
    backgroundColor: colors.accent,
    borderRadius: 18,
    justifyContent: "center",
    minHeight: 52,
    paddingHorizontal: 18,
  },
  sendButtonText: {
    color: colors.background,
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
  subtitle: {
    color: colors.textSoft,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
  },
  summaryStrip: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 18,
  },
  title: {
    color: colors.text,
    fontSize: 32,
    fontWeight: "700",
    letterSpacing: -0.7,
    marginTop: 8,
  },
});
