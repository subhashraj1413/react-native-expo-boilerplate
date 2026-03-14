/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/consistent-type-imports */
import type { ComponentProps } from "react";
import "react-native-gesture-handler/jestSetup";
import "@testing-library/react-native";

jest.mock("react-native-safe-area-context", () => {
  const mockReact = require("react") as typeof import("react");
  const { View: MockNativeView } =
    require("react-native") as typeof import("react-native");

  const mockFrame = { height: 640, width: 320, x: 0, y: 0 };
  const mockInsets = { bottom: 0, left: 0, right: 0, top: 0 };
  const SafeAreaInsetsContext = mockReact.createContext(mockInsets);
  const SafeAreaFrameContext = mockReact.createContext(mockFrame);

  const SafeAreaProvider = ({
    children,
  }: {
    children: ComponentProps<typeof MockNativeView>["children"];
  }) => {
    return mockReact.createElement(
      SafeAreaInsetsContext.Provider,
      { value: mockInsets },
      mockReact.createElement(
        SafeAreaFrameContext.Provider,
        { value: mockFrame },
        children,
      ),
    );
  };

  return {
    SafeAreaConsumer: SafeAreaInsetsContext.Consumer,
    SafeAreaFrameContext,
    SafeAreaInsetsContext,
    SafeAreaProvider,
    SafeAreaView: MockNativeView,
    initialWindowMetrics: {
      frame: mockFrame,
      insets: mockInsets,
    },
    useSafeAreaFrame: () => mockFrame,
    useSafeAreaInsets: () => mockInsets,
  };
});

jest.mock("react-native-screens", () => {
  const mockReact = require("react") as typeof import("react");
  const { View: MockNativeView } =
    require("react-native") as typeof import("react-native");

  const MockView = mockReact.forwardRef(
    (props: ComponentProps<typeof MockNativeView>, ref) => {
      return mockReact.createElement(
        MockNativeView,
        { ...props, ref } as never,
        props.children,
      );
    },
  );

  const mockExports = {
    FullWindowOverlay: MockView,
    SearchBar: MockView,
    enableFreeze: jest.fn(),
    enableScreens: jest.fn(),
    executeNativeBackPress: jest.fn(),
    freezeEnabled: jest.fn(() => false),
    isSearchBarAvailableForCurrentPlatform: jest.fn(() => false),
    screensEnabled: jest.fn(() => false),
    useTransitionProgress: jest.fn(() => ({
      closing: { addListener: jest.fn(), interpolate: jest.fn() },
      goingForward: { addListener: jest.fn(), interpolate: jest.fn() },
      progress: { addListener: jest.fn(), interpolate: jest.fn() },
    })),
  };

  return new Proxy(mockExports, {
    get: (target, property) => {
      if (property in target) {
        return target[property as keyof typeof target];
      }

      return MockView;
    },
  });
});
