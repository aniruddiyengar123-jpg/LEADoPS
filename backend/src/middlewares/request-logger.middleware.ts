import type { RequestHandler } from "express";
import morgan from "morgan";
import { logger } from "../config/logger.js";
import type { RequestLogMetadata } from "../types/observability.types.js";

function parseStatus(value: string | undefined): number {
  return Number(value ?? 0);
}

function parseResponseTime(value: string | undefined): number {
  return Number(Number(value ?? 0).toFixed(2));
}

export const requestLogger: RequestHandler = morgan(
  (tokens, req, res) => {
    const metadata: RequestLogMetadata = {
      type: "http_request",
      method: tokens.method(req, res) ?? "",
      url: tokens.url(req, res) ?? "",
      statusCode: parseStatus(tokens.status(req, res)),
      responseTimeMs: parseResponseTime(tokens["response-time"](req, res)),
      contentLength: tokens.res(req, res, "content-length"),
      ip: tokens["remote-addr"](req, res),
      userAgent: tokens["user-agent"](req, res)
    };

    return JSON.stringify(metadata);
  },
  {
    stream: {
      write(message) {
        const metadata = JSON.parse(message.trim()) as RequestLogMetadata;
        logger.http("request completed", metadata);
      }
    }
  }
);

