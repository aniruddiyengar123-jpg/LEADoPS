import type { NextFunction, Request, Response } from "express";
import type { UserRole } from "../constants/roles.js";
import { ApiError } from "../utils/api-error.js";

export function authorize(...allowedRoles: UserRole[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new ApiError(401, "Authentication required");
    }

    if (!allowedRoles.includes(req.user.role)) {
      throw new ApiError(403, "Insufficient permissions");
    }

    next();
  };
}

