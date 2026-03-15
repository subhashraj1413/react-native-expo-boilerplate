import type { ApiError } from "../types/global";

export const formatApiError = (error: unknown, fallback: string) => {
  if (
    error &&
    typeof error === "object" &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }

  return fallback;
};

export const formatTimeLabel = (isoDate: string) => {
  const date = new Date(isoDate);

  return new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
};

export const createApiError = (message: string, status = 400): ApiError => ({
  message,
  status,
});
