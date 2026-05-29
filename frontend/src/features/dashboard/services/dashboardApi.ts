import { api } from "../../../lib/api";

export type DashboardSummary = {
  totalLeads: number;
  openLeads: number;
  wonLeads: number;
  lostLeads: number;
  estimatedPipeline: number;
};

export async function getDashboardSummary() {
  const { data } = await api.get<DashboardSummary>("/dashboard/summary");
  return data;
}

