import fs from "node:fs";
import path from "node:path";
import winston from "winston";
import { env } from "./env.js";

const logDirectory = path.resolve(process.cwd(), env.LOG_DIR);

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

const productionFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

const developmentFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf(({ level, message, timestamp, ...metadata }) => {
    const details = Object.keys(metadata).length > 0 ? ` ${JSON.stringify(metadata)}` : "";
    return `${timestamp} ${level}: ${message}${details}`;
  })
);

export const logger = winston.createLogger({
  level: env.LOG_LEVEL,
  format: env.NODE_ENV === "production" ? productionFormat : developmentFormat,
  defaultMeta: {
    service: "lead-management-api"
  },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.join(logDirectory, "error.log"),
      level: "error"
    }),
    new winston.transports.File({
      filename: path.join(logDirectory, "combined.log")
    })
  ]
});

