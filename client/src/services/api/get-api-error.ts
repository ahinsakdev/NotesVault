import axios from "axios";

type ApiErrorBody = {
  error?: {
    code?: string;
    message?: string;
  };
};

export function getApiErrorMessage(
  error: unknown,
  fallbackMessage = "Something went wrong.",
): string {
  if (axios.isAxiosError<ApiErrorBody>(error)) {
    const message = error.response?.data?.error?.message;

    if (message) {
      return message;
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallbackMessage;
}

export function getApiErrorCode(error: unknown): string | null {
  if (!axios.isAxiosError<ApiErrorBody>(error)) {
    return null;
  }

  return error.response?.data?.error?.code ?? null;
}
