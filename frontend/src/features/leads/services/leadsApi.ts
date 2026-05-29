import { api } from "../../../lib/api";
import type { Lead, LeadSource, LeadStatus, Paginated } from "../../../types/api";

export type LeadFilters = {
  page: number;
  search?: string;
  status?: LeadStatus;
  source?: LeadSource;
  sort?: "latest" | "oldest";
};

export type LeadPayload = {
  name: string;
  email: string;
  source: LeadSource;
  status: LeadStatus;
};

export async function getLeads(filters: LeadFilters) {
  const { data } = await api.get<Paginated<Lead>>("/leads", { params: filters });
  return data;
}

export async function createLead(payload: LeadPayload) {
  const { data } = await api.post<Lead>("/leads", payload);
  return data;
}

export async function updateLead(id: string, payload: Partial<LeadPayload>) {
  const { data } = await api.patch<Lead>(`/leads/${id}`, payload);
  return data;
}

export async function getLead(id: string) {
  const { data } = await api.get<Lead>(`/leads/${id}`);
  return data;
}

export async function deleteLead(id: string) {
  const { data } = await api.delete<{ id: string }>(`/leads/${id}`);
  return data;
}
