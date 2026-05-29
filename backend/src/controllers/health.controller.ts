import type { Request, Response } from "express";
import type { HealthCheckResponse } from "../types/observability.types.js";

export const healthController = {
  check(_req: Request, res: Response) {
    const response: HealthCheckResponse = {
      status: "ok",
      service: "lead-management-api",
      uptimeSeconds: Math.round(process.uptime()),
      timestamp: new Date().toISOString()
    };

    res.status(200).json(response);
  }
};

