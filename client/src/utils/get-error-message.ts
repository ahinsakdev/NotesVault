type ErrorWithMessage = {
  message: string;
};

function isErrorWithMessage(value: unknown): value is ErrorWithMessage {
  return (
    typeof value === "object" &&
    value !== null &&
    "message" in value &&
    typeof value.message === "string"
  );
}

export function getErrorMessage(
  error: unknown,
  fallbackMessage = "Something went wrong.",
) {
  if (isErrorWithMessage(error)) {
    return error.message;
  }

  if (typeof error === "string" && error.trim().length > 0) {
    return error;
  }

  return fallbackMessage;
}
