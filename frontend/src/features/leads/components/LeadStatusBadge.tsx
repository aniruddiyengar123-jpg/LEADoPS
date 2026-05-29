import { Badge } from "../../../components/ui/Badge";
import type { LeadStatus } from "../../../types/api";

const tones: Record<LeadStatus, "neutral" | "blue" | "green" | "amber" | "red"> = {
  NEW: "blue",
  CONTACTED: "neutral",
  QUALIFIED: "green",
  LOST: "red"
};

export function LeadStatusBadge({ status }: { status: LeadStatus }) {
  return <Badge tone={tones[status]}>{status.replace("_", " ")}</Badge>;
}
