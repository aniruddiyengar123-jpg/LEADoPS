import type { LeadSource, LeadStatus } from "../constants/leads.js";

export interface CreateLeadDto {
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
}

export interface UpdateLeadDto {
  name?: string;
  email?: string;
  status?: LeadStatus;
  source?: LeadSource;
}

export interface LeadQueryDto {
  status?: LeadStatus;
  source?: LeadSource;
  search?: string;
  sort?: "latest" | "oldest";
  page?: number;
}

export interface LeadResponse {
  id: string;
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  createdAt: Date;
}

export interface PaginatedLeadsResponse {
  data: LeadResponse[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
}
