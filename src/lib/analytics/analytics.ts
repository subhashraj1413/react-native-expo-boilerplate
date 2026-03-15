import { logger } from "../../utils/logger";

export const analytics = {
  track(event: string, payload?: Record<string, unknown>) {
    logger.info("analytics", event, payload ?? {});
  },
};
