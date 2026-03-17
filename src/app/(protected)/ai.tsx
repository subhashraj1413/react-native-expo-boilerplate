import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  TextInput,
  View,
} from "react-native";
import { Surface } from "@/components/ui/Surface";
import { AppText } from "@/components/ui/Text";
import { useSession } from "@/features/auth/hooks/useSession";
import {
  getAssistantReply,
  type ChatAction,
} from "@/features/ai/lib/chatbot";
import { useTheme } from "@/hooks/useTheme";

type Message = {
  actions?: ChatAction[];
  id: string;
  role: "assistant" | "user";
  text: string;
};

const quickPrompts = [
  "Open settings",
  "Where is account?",
  "Take me to search",
  "How do I change theme?",
] as const;

export default function AiScreen() {
  const router = useRouter();
  const { session } = useSession();
  const { theme } = useTheme();
  const scrollRef = useRef<ScrollView>(null);
  const firstName = session?.user.name.split(" ")[0] ?? "there";
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      text: `Hi ${firstName}. Ask about navigation, settings, profile, account, theme, or search.`,
    },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 40);

    return () => {
      clearTimeout(timer);
    };
  }, [messages]);

  const submitPrompt = (rawValue: string) => {
    const value = rawValue.trim();

    if (!value) {
      return;
    }

    const userMessage: Message = {
      id: `user-${String(Date.now())}`,
      role: "user",
      text: value,
    };
    const reply = getAssistantReply(value, session?.user.name);
    const assistantMessage: Message = {
      actions: reply.actions,
      id: `assistant-${String(Date.now())}`,
      role: "assistant",
      text: reply.text,
    };

    setMessages(current => [...current, userMessage, assistantMessage]);
    setInput("");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1"
      style={{ backgroundColor: theme.background }}
    >
      <View className="flex-1 px-5 pb-5 pt-4">
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={{ paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="mb-5">
            <AppText variant="eyebrow">AI Assistant</AppText>
            <AppText className="mt-3" variant="title">
              In-app guide and quick navigation
            </AppText>
            <AppText className="mt-3 max-w-[330px]" tone="muted" variant="body">
              Use the assistant to understand the protected flow and jump into the right screen quickly.
            </AppText>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 10, paddingBottom: 18 }}
          >
            {quickPrompts.map(prompt => (
              <Pressable
                key={prompt}
                className="rounded-full px-4 py-3"
                onPress={() => {
                  submitPrompt(prompt);
                }}
                style={{
                  backgroundColor: theme.accentSoft,
                  borderColor: theme.accentBorder,
                  borderWidth: 1,
                }}
              >
                <AppText variant="body">{prompt}</AppText>
              </Pressable>
            ))}
          </ScrollView>

          <View className="gap-4">
            {messages.map(message => {
              const isAssistant = message.role === "assistant";

              return (
                <View
                  key={message.id}
                  className={isAssistant ? "items-start" : "items-end"}
                >
                  <Surface
                    className="max-w-[88%] rounded-[28px] px-5 py-4"
                    tone={isAssistant ? "default" : "accent"}
                  >
                    <View className="flex-row items-center gap-2">
                      {isAssistant ? (
                        <Ionicons color={theme.accent} name="sparkles-outline" size={16} />
                      ) : null}
                      <AppText tone="muted" variant="caption">
                        {isAssistant ? "Assistant" : "You"}
                      </AppText>
                    </View>
                    <AppText className="mt-2" variant="body">
                      {message.text}
                    </AppText>

                    {message.actions?.length ? (
                      <View className="mt-4 gap-2">
                        {message.actions.map(action => (
                          <Pressable
                            key={`${message.id}-${action.label}`}
                            className="flex-row items-center justify-between rounded-[18px] px-4 py-3"
                            onPress={() => {
                              router.push(action.href);
                            }}
                            style={{
                              backgroundColor: theme.card,
                              borderColor: theme.border,
                              borderWidth: 1,
                            }}
                          >
                            <AppText variant="body">{action.label}</AppText>
                            <Ionicons
                              color={theme.secondaryText}
                              name="arrow-forward-outline"
                              size={16}
                            />
                          </Pressable>
                        ))}
                      </View>
                    ) : null}
                  </Surface>
                </View>
              );
            })}
          </View>
        </ScrollView>

        <Surface className="rounded-[28px] p-3" tone="strong">
          <TextInput
            multiline
            onChangeText={setInput}
            placeholder="Ask about settings, account, search, theme..."
            placeholderTextColor={theme.placeholder}
            style={{
              color: theme.primaryText,
              maxHeight: 120,
              minHeight: 48,
              paddingHorizontal: 12,
              paddingVertical: 10,
              textAlignVertical: "top",
            }}
            value={input}
          />
          <View className="mt-2 flex-row justify-end">
            <Pressable
              className="flex-row items-center gap-2 rounded-full px-4 py-3"
              disabled={!input.trim()}
              onPress={() => {
                submitPrompt(input);
              }}
              style={{
                backgroundColor: input.trim() ? theme.accent : theme.accentBorder,
              }}
            >
              <AppText
                style={{ color: input.trim() ? theme.onAccent : theme.primaryText }}
                variant="body"
              >
                Send
              </AppText>
              <Ionicons
                color={input.trim() ? theme.onAccent : theme.primaryText}
                name="paper-plane-outline"
                size={16}
              />
            </Pressable>
          </View>
        </Surface>
      </View>
    </KeyboardAvoidingView>
  );
}
