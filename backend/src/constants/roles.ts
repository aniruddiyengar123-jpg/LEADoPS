export const UserRole = {
  Admin: "ADMIN",
  SalesUser: "SALES_USER"
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

