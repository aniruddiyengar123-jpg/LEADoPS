export type UserRole = "ADMIN" | "SALES_USER";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive?: boolean;
};

export type LeadStatus = "NEW" | "CONTACTED" | "QUALIFIED" | "LOST";

export type LeadSource = "WEBSITE" | "INSTAGRAM" | "REFERRAL";

export type Lead = {
  id: string;
  name: string;
  email: string;
  source: LeadSource;
  status: LeadStatus;
  createdAt: string;
};

export type Paginated<T> = {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
};
