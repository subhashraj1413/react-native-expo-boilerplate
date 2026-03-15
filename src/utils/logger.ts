export const logger = {
  error: (...args: unknown[]) => {
    console.error("[orbit]", ...args);
  },
  info: (...args: unknown[]) => {
    console.info("[orbit]", ...args);
  },
};
