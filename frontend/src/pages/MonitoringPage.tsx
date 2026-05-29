import { Activity, Server, ShieldCheck } from "lucide-react";
import { PageHeader } from "../components/common/PageHeader";

export function MonitoringPage() {
  return (
    <>
      <PageHeader title="Monitoring" description="Operational status for API, database, and security controls." />
      <section className="space-y-4 p-4 md:p-6">
        {[
          { label: "API service", value: "Ready", icon: Server },
          { label: "Database", value: "Awaiting live check", icon: Activity },
          { label: "Auth guard", value: "Enabled", icon: ShieldCheck }
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="panel flex items-center justify-between rounded p-5">
              <div className="flex items-center gap-4">
                <Icon className="text-warning" size={24} />
                <p className="font-medium text-ink">{item.label}</p>
              </div>
              <span className="text-sm text-sand/70">{item.value}</span>
            </div>
          );
        })}
      </section>
    </>
  );
}
