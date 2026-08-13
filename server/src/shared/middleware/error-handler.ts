import type { ErrorRequestHandler } from "express";

import { AppError } from "../errors/app-error.js";

type HttpParserError = Error & {
  status?: number;
  statusCode?: number;
  type?: string;
};

function isHttpParserError(error: unknown): error is HttpParserError {
  return error instanceof Error;
}

function isPayloadTooLargeError(error: unknown): boolean {
  if (!isHttpParserError(error)) {
    return false;
  }

  return (
    error.status === 413 ||
    error.statusCode === 413 ||
    error.type === "entity.too.large"
  );
}

function isInvalidJsonError(error: unknown): boolean {
  if (!isHttpParserError(error)) {
    return false;
  }

  return (
    error instanceof SyntaxError &&
    (
      error.status === 400 ||
      error.statusCode === 400 ||
      error.type === "entity.parse.failed"
    )
  );
}

export const errorHandler: ErrorRequestHandler = (
  error,
  _request,
  response,
  next,
) => {
  if (response.headersSent) {
    next(error);
    return;
  }

  if (error instanceof AppError) {
    response.status(error.statusCode).json({
      error: {
        code: error.code,
        message: error.message,
      },
    });

    return;
  }

  if (isPayloadTooLargeError(error)) {
    response.status(413).json({
      error: {
        code: "PAYLOAD_TOO_LARGE",
        message: "Request payload is too large",
      },
    });

    return;
  }

  if (isInvalidJsonError(error)) {
    response.status(400).json({
      error: {
        code: "INVALID_JSON",
        message: "Request body contains invalid JSON",
      },
    });

    return;
  }

  console.error(error);

  response.status(500).json({
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred",
    },
  });
};
