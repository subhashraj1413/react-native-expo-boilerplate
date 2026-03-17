export default {
  backToLogin: "Back to login",
  createAccount: "Create account",
  createWorkspace: "Create workspace",
  demo: "Demo: {{email}} / {{password}}",
  email: "Email",
  flow: "Auth flow",
  forgotPassword: "Forgot password",
  forgotSubtitle:
    "Side routes like password recovery now have a dedicated file instead of being conditionally rendered inside a login screen.",
  forgotTitle: "Reset your password",
  forgotUnable: "Unable to send reset email.",
  fullName: "Full name",
  login: "Login",
  loginSubtitle:
    "This screen stays narrow in responsibility: collect credentials, run the mutation, and let the surrounding providers handle the session.",
  loginTitle: "Welcome back",
  password: "Password",
  registerSubtitle:
    "Registration lives in the auth module as a sibling route, not inside one giant screen component.",
  registerTitle: "Create a new account",
  registerUnable: "Unable to register.",
  resetLink: "Send reset link",
  signInUnable: "Unable to sign in.",
  successReset: "A reset link was generated for this account.",
} as const;
