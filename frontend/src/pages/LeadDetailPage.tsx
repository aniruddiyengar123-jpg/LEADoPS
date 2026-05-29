import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { LoadingState } from "../components/common/LoadingState";
import { PageHeader } from "../components/common/PageHeader";
import { Button } from "../components/ui/Button";
import { LeadForm } from "../features/leads/components/LeadForm";
import { LeadStatusBadge } from "../features/leads/components/LeadStatusBadge";
import { getLead, updateLead, type LeadPayload } from "../features/leads/services/leadsApi";

export function LeadDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: lead, isLoading } = useQuery({
    queryKey: ["lead", id],
    queryFn: () => getLead(id ?? ""),
    enabled: Boolean(id)
  });

  const updateMutation = useMutation({
    mutationFn: (values: LeadPayload) => updateLead(id ?? "", values),
    onSuccess: (updatedLead) => {
      queryClient.setQueryData(["lead", id], updatedLead);
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      navigate("/leads");
    }
  });

  if (!id) {
    return <Navigate to="/leads" replace />;
  }

  return (
    <>
      <PageHeader
        title={lead?.name ?? "Lead"}
        description={lead ? `${lead.email} - ${lead.source}` : "Loading lead details."}
        actions={
          <Link
            to="/leads"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-copper/60 bg-graphite px-4 text-sm font-medium text-sand transition hover:border-warning"
          >
            <ArrowLeft size={16} />
            Back
          </Link>
        }
      />

      <section className="grid gap-4 p-4 md:p-6 xl:grid-cols-[360px_1fr]">
        <div className="panel rounded p-5">
          {isLoading ? (
            <LoadingState label="Loading lead..." />
          ) : lead ? (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-sand/65">Status</p>
                <div className="mt-2">
                  <LeadStatusBadge status={lead.status} />
                </div>
              </div>
              <div>
                <p className="text-sm text-sand/65">Email</p>
                <p className="mt-1 font-medium text-ink">{lead.email}</p>
              </div>
              <div>
                <p className="text-sm text-sand/65">Source</p>
                <p className="mt-1 font-medium text-ink">{lead.source}</p>
              </div>
              <div>
                <p className="text-sm text-sand/65">Created</p>
                <p className="mt-1 font-medium text-ink">{new Date(lead.createdAt).toLocaleString()}</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-sand/65">Lead not found.</p>
          )}
        </div>

        {lead ? (
          <LeadForm
            defaultValues={lead}
            onSubmit={(values) => updateMutation.mutate(values)}
            isSubmitting={updateMutation.isPending}
            onCancel={() => navigate("/leads")}
          />
        ) : (
          <div className="panel rounded p-5">
            <Button variant="secondary" onClick={() => navigate("/leads")}>
              Return to leads
            </Button>
          </div>
        )}
      </section>
    </>
  );
}
