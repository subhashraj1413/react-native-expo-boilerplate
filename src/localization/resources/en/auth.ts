export default {
  backToLogin: "Back to login",
  biometricCancel: "Cancel",
  biometricFailed: "Biometric verification failed. Try again or use your password.",
  biometricFallback: "Use passcode",
  biometricLockedOut:
    "Biometric authentication is temporarily locked. Unlock the device and try again.",
  biometricLogin: "Continue with {{method}}",
  biometricMethodFace: "Face ID",
  biometricMethodFingerprint: "Fingerprint",
  biometricMethodGeneric: "biometrics",
  biometricMethodIris: "iris scan",
  biometricMissingCredentials:
    "Biometric sign-in is not ready yet. Sign in once with your email and password first.",
  biometricPrompt: "Confirm with {{method}} to sign in",
  biometricSavedCredentialsExpired:
    "Saved biometric credentials are no longer valid. Sign in with your password to set them up again.",
  biometricSetupHint:
    "{{method}} sign-in becomes available after one successful password login on this device.",
  biometricUnavailable:
    "Biometric sign-in is unavailable on this device or no biometric is enrolled yet.",
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
