export default {
  assistant: "Assistant",
  backToWorkspace: "Back to workspace",
  chatbot: {
    accountText: "Account is where signed-in identity details and sign-out controls currently live.",
    drawerText:
      "The protected area uses a shared drawer. Tabs stay inside the workspace screen group, while settings and account stay available from the same menu shell.",
    fallbackText:
      "I can help with app navigation and common actions. Try asking about home, search, profile, settings, account, theme, or sign out.",
    greetingReply: "Hi {{name}}. I can help you navigate the app and jump to the right protected screen.",
    homeText: "Home is the main workspace screen. It shows the feed cards and the primary signed-in overview.",
    profileText:
      "Profile holds your identity view and account details. App-wide preferences now live in the drawer menu.",
    searchText:
      "Search lives in the protected tab group. Use it for discovery flows without leaving the main workspace.",
    settingsText:
      "Settings is part of the protected drawer and contains the overview plus deeper account-related routes.",
    signOutText: "The sign-out action is available from the account screen and in the protected drawer footer.",
    themeText: "Theme switching is now available from the drawer preferences across the whole app.",
  },
  emptyPrompt: "Ask me about navigation, settings, profile, search, feed, or account actions.",
  fallbackName: "there",
  greeting: "Hi {{name}}. Ask about navigation, settings, profile, account, theme, or search.",
  openAccount: "Open account",
  openDrawerMenu: "Open drawer menu",
  openHome: "Open home",
  openProfile: "Open profile",
  openSearch: "Open search",
  openSettings: "Open settings",
  openSignOut: "Open sign out screen",
  placeholder: "Ask about settings, account, search, theme...",
  quickNavigationSubtitle:
    "Use the assistant to understand the protected flow and jump into the right screen quickly.",
  quickNavigationTitle: "In-app guide and quick navigation",
  quickPrompts: [
    "Open settings",
    "Where is account?",
    "Take me to search",
    "How do I change theme?",
  ],
  screenTitle: "AI Assistant",
  send: "Send",
  user: "You",
} as const;
