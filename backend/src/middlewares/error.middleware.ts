import type { ErrorRequestHandler } from "express";
import { logger } from "../config/logger.js";
import { env } from "../config/env.js";
import { ApiError } from "../utils/api-error.js";

export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  const error = err instanceof Error ? err : new Error("Unknown error");

  logger.error("request failed", {
    type: "http_error",
    method: req.method,
    url: req.originalUrl,
    statusCode: err instanceof ApiError ? err.statusCode : 500,
    message: error.message,
    stack: error.stack
  });

  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      message: err.message,
      details: err.details
    });
    return;
  }

  res.status(500).json({
    message: "Internal server error",
    details: env.NODE_ENV === "development" ? err.message : undefined
  });
};
