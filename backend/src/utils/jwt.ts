import jwt, { type SignOptions } from "jsonwebtoken";
import { env } from "../config/env.js";
import { UserRole } from "../constants/roles.js";
import type { JwtPayload } from "../types/auth.types.js";

export function signAccessToken(payload: JwtPayload): string {
  const options: SignOptions = {
    expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"]
  };

  return jwt.sign(payload, env.JWT_SECRET, options);
}

function isJwtPayload(value: unknown): value is JwtPayload {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const payload = value as Record<string, unknown>;
  return (
    typeof payload.sub === "string" &&
    (payload.role === UserRole.Admin || payload.role === UserRole.SalesUser)
  );
}

export function verifyAccessToken(token: string): JwtPayload {
  const decoded = jwt.verify(token, env.JWT_SECRET);

  if (!isJwtPayload(decoded)) {
    throw new Error("Invalid token payload");
  }

  return decoded;
}
