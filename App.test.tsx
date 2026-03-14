import { screen } from "@testing-library/react-native";
import { App } from "./App";
import { renderWithProviders } from "./src/utils/test-utils";

test("app opens on a functional sign-in screen", () => {
  renderWithProviders(<App />);

  expect(screen.getByText("Secure sign in")).toBeOnTheScreen();
  expect(screen.getByText("Enter the protected workspace.")).toBeOnTheScreen();
});

test("invalid credentials keep the user on the auth screen", async () => {
  const { user } = renderWithProviders(<App />);

  const emailInput = screen.getByLabelText("Workspace email");
  const passwordInput = screen.getByLabelText("Workspace password");

  await user.clear(emailInput);
  await user.type(emailInput, "wrong@example.com");
  await user.clear(passwordInput);
  await user.type(passwordInput, "bad-pass");
  await user.press(screen.getByText("Enter workspace"));

  expect(screen.getByText("Use ops@orbit.ai / launch-ready")).toBeOnTheScreen();
  expect(screen.queryByText("Orbit workspace")).not.toBeOnTheScreen();
});

test("demo credentials unlock the protected stack and counter screen", async () => {
  const { user } = renderWithProviders(<App />);

  await user.press(screen.getByText("Enter workspace"));

  expect(screen.getByText("Welcome back, Maya")).toBeOnTheScreen();

  await user.press(screen.getByText("Counter lab"));
  expect(screen.getByText("Redux feature")).toBeOnTheScreen();
  expect(screen.getByText("Add Amount")).toBeOnTheScreen();
});

test("sign out returns to the auth screen", async () => {
  const { user } = renderWithProviders(<App />);

  await user.press(screen.getByText("Enter workspace"));
  await user.press(screen.getByText("Settings"));
  await user.press(screen.getByText("Sign out"));

  expect(screen.getByText("Secure sign in")).toBeOnTheScreen();
});
