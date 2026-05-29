import type { NextFunction, Request, Response } from "express";
import type { AnyZodObject } from "zod";
import { ApiError } from "../utils/api-error.js";

export function validate(schema: AnyZodObject) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params
    });

    if (!result.success) {
      throw new ApiError(400, "Validation failed", result.error.flatten());
    }

    req.body = result.data.body ?? req.body;
    req.query = result.data.query ?? req.query;
    req.params = result.data.params ?? req.params;
    next();
  };
}

