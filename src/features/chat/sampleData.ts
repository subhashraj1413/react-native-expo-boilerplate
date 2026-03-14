export type RouteCard = {
  description: string;
  id: string;
  route: "Chat" | "Counter" | "Insights" | "Quotes" | "Settings";
  title: string;
};

export type InsightMetric = {
  id: string;
  label: string;
  value: string;
};

export type TimelineItem = {
  id: string;
  summary: string;
  time: string;
  title: string;
};

export type ChatMessage = {
  id: string;
  meta: string;
  role: "assistant" | "user";
  text: string;
};

export const routeCards: RouteCard[] = [
  {
    id: "chat",
    route: "Chat",
    title: "Chat workspace",
    description: "Open the modern assistant UI and continue the live thread.",
  },
  {
    id: "counter",
    route: "Counter",
    title: "Counter lab",
    description: "Use the existing Redux counter feature on its own screen.",
  },
  {
    id: "quotes",
    route: "Quotes",
    title: "Quotes feed",
    description: "Load the RTK Query quotes feature as a dedicated screen.",
  },
  {
    id: "insights",
    route: "Insights",
    title: "Workspace insights",
    description:
      "Review assistant metrics, timeline signals, and operations health.",
  },
  {
    id: "settings",
    route: "Settings",
    title: "Settings",
    description: "Check demo access rules and sign out of the protected stack.",
  },
];

export const insightMetrics: InsightMetric[] = [
  { id: "satisfaction", label: "assistant rating", value: "98.4%" },
  { id: "automation", label: "automated actions", value: "312" },
  { id: "latency", label: "median response", value: "1.3s" },
  { id: "handoff", label: "human handoff", value: "4.2%" },
];

export const timeline: TimelineItem[] = [
  {
    id: "triage",
    title: "Launch support triage",
    summary:
      "Priority routing rules reduced manual review queues in the last cycle.",
    time: "08:10 GST",
  },
  {
    id: "retention",
    title: "Retention signal detected",
    summary:
      "Assistant flagged 12 at-risk accounts and drafted follow-up sequences.",
    time: "09:40 GST",
  },
  {
    id: "brief",
    title: "Daily brief published",
    summary:
      "Operations snapshot delivered to leadership with action summaries.",
    time: "11:05 GST",
  },
];

export const quickPrompts = [
  "Summarize the highest priority blockers for today's launch.",
  "Draft a calm response for a delayed enterprise customer.",
  "Turn this thread into a next-step checklist for the ops pod.",
];

export const initialMessages: ChatMessage[] = [
  {
    id: "assistant-1",
    role: "assistant",
    text: "Morning sync is complete. I found three escalations that need a fast decision before the next launch window.",
    meta: "Nova assistant 09:14",
  },
  {
    id: "user-1",
    role: "user",
    text: "Show me the risk profile and tell me which team should own first response.",
    meta: "You 09:15",
  },
  {
    id: "assistant-2",
    role: "assistant",
    text: "Billing owns two of them because the recovery path needs account-level approval. Support should answer the migration issue with a 30-minute SLA.",
    meta: "Nova assistant 09:16",
  },
];

export const cannedReplies = [
  "I converted that request into a short operations brief and mapped owners by urgency.",
  "I can package that into a launch-ready checklist with blockers, owners, and response copy.",
  "That thread benefits from a softer tone. I drafted a version that protects confidence while staying direct.",
];
