import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Eye, Plus, Search, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { EmptyState } from "../components/common/EmptyState";
import { LoadingState } from "../components/common/LoadingState";
import { PageHeader } from "../components/common/PageHeader";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { LeadForm } from "../features/leads/components/LeadForm";
import { LeadStatusBadge } from "../features/leads/components/LeadStatusBadge";
import { createLead, deleteLead, getLeads, type LeadFilters, type LeadPayload } from "../features/leads/services/leadsApi";
import { useDebounce } from "../hooks/useDebounce";
import type { LeadSource, LeadStatus } from "../types/api";

export function LeadsPage() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [source, setSource] = useState("");
  const [sort, setSort] = useState<"latest" | "oldest">("latest");
  const debouncedSearch = useDebounce(search);

  const filters: LeadFilters = useMemo(
    () => ({
      page,
      search: debouncedSearch || undefined,
      status: (status || undefined) as LeadStatus | undefined,
      source: (source || undefined) as LeadSource | undefined,
      sort
    }),
    [page, debouncedSearch, status, source, sort]
  );

  const { data, isLoading } = useQuery({
    queryKey: ["leads", filters],
    queryFn: () => getLeads(filters)
  });

  const createMutation = useMutation({
    mutationFn: createLead,
    onSuccess: () => {
      setShowForm(false);
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteLead,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["leads"] })
  });

  return (
    <>
      <PageHeader
        title="Leads"
        description="Search, filter, create, and maintain pipeline records."
        actions={
          <Button onClick={() => setShowForm((value) => !value)}>
            <Plus size={18} />
            New lead
          </Button>
        }
      />

      <section className="space-y-4 p-4 md:p-6">
        {showForm ? (
          <LeadForm
            onSubmit={(values: LeadPayload) => createMutation.mutate(values)}
            isSubmitting={createMutation.isPending}
            onCancel={() => setShowForm(false)}
          />
        ) : null}

        <div className="panel overflow-hidden rounded">
          <div className="grid gap-3 border-b border-copper/35 p-4 md:grid-cols-[1fr_160px_160px_140px]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-2.5 text-slate-400" size={18} />
              <Input
                className="pl-10"
                placeholder="Search name or email"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
              />
            </div>
            <Select
              value={status}
              onChange={(event) => {
                setStatus(event.target.value);
                setPage(1);
              }}
            >
              <option value="">All statuses</option>
              {["NEW", "CONTACTED", "QUALIFIED", "LOST"].map((value) => (
                <option key={value}>{value}</option>
              ))}
            </Select>
            <Select
              value={source}
              onChange={(event) => {
                setSource(event.target.value);
                setPage(1);
              }}
            >
              <option value="">All sources</option>
              {["WEBSITE", "INSTAGRAM", "REFERRAL"].map((value) => (
                <option key={value}>{value}</option>
              ))}
            </Select>
            <Select value={sort} onChange={(event) => setSort(event.target.value as "latest" | "oldest")}>
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
            </Select>
          </div>

          {isLoading ? (
            <div className="p-4">
              <LoadingState label="Loading leads..." />
            </div>
          ) : data?.data.length ? (
            <>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-left text-sm">
                  <thead className="bg-[#101211] text-xs uppercase text-sand/65">
                    <tr>
                      <th className="px-4 py-3">Lead</th>
                      <th className="px-4 py-3">Source</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Created</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-copper/25">
                    {data.data.map((lead) => (
                      <tr key={lead.id} className="hover:bg-white/[0.03]">
                        <td className="px-4 py-3">
                          <p className="font-medium text-ink">{lead.name}</p>
                          <p className="text-xs text-sand/65">{lead.email}</p>
                        </td>
                        <td className="px-4 py-3">{lead.source}</td>
                        <td className="px-4 py-3">
                          <LeadStatusBadge status={lead.status} />
                        </td>
                        <td className="px-4 py-3">{new Date(lead.createdAt).toLocaleDateString()}</td>
                        <td className="px-4 py-3">
                          <div className="flex justify-end gap-2">
                            <Link
                              className="inline-flex h-8 items-center justify-center gap-2 rounded-md px-2 text-sm font-medium text-sand hover:bg-white/5 hover:text-warning"
                              to={`/leads/${lead.id}`}
                              aria-label={`View ${lead.name}`}
                            >
                              <Eye size={16} />
                            </Link>
                            <Button
                              variant="ghost"
                              className="h-8 px-2 text-danger"
                              onClick={() => deleteMutation.mutate(lead.id)}
                              aria-label={`Delete ${lead.name}`}
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col gap-3 border-t border-copper/35 px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between">
                <span className="text-sand/65">
                  Page {data.pagination.currentPage} of {data.pagination.totalPages || 1} - {data.pagination.totalItems} items
                </span>
                <div className="flex gap-2">
                  <Button variant="secondary" disabled={page <= 1} onClick={() => setPage((current) => current - 1)}>
                    Previous
                  </Button>
                  <Button
                    variant="secondary"
                    disabled={!data || page >= data.pagination.totalPages}
                    onClick={() => setPage((current) => current + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="p-4">
              <EmptyState
                title="No leads found"
                description="Create a lead or adjust the current filters."
                action={
                  <Button onClick={() => setShowForm(true)}>
                    <Plus size={18} />
                    New lead
                  </Button>
                }
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
