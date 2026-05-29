import { z } from "zod";
import { UserRole } from "../constants/roles.js";

export const registerSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2, "Name must be at least 2 characters"),
    email: z.string().trim().email("Email must be valid").toLowerCase(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    role: z.enum([UserRole.Admin, UserRole.SalesUser]).optional()
  })
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().trim().email("Email must be valid").toLowerCase(),
    password: z.string().min(1, "Password is required")
  })
});

