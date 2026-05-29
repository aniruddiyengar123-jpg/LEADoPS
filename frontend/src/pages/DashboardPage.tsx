import { BarChart3, CircleDollarSign, Target, Users } from "lucide-react";
import { PageHeader } from "../components/common/PageHeader";

const metrics = [
  { label: "Total leads", value: "0", icon: Users },
  { label: "Qualified", value: "0", icon: Target },
  { label: "Open pipeline", value: "0", icon: BarChart3 },
  { label: "Estimated value", value: "$0", icon: CircleDollarSign }
];

const recentActivity = ["No recent lead activity", "Create a lead to start tracking pipeline movement"];

export function DashboardPage() {
  return (
    <>
      <PageHeader title="Dashboard" description="Pipeline health, lead activity, and operational snapshots." />

      <section className="space-y-5 p-4 md:p-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div key={metric.label} className="panel rounded p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-sand">{metric.label}</p>
                  <Icon className="text-warning" size={22} />
                </div>
                <p className="mt-4 text-3xl font-semibold text-ink">{metric.value}</p>
              </div>
            );
          })}
        </div>

        <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="panel rounded p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold text-warning">Pipeline Trend</h2>
              <span className="mono text-xs text-sand">LIVE VIEW</span>
            </div>
            <div className="grid-chart grid min-h-[280px] place-items-center rounded border border-copper/30 bg-[#101211]">
              <p className="text-sm text-sand">Lead volume chart appears when pipeline data is available.</p>
            </div>
          </div>

          <div className="panel rounded p-5">
            <h2 className="text-base font-semibold text-warning">Recent Activity</h2>
            <div className="mt-4 space-y-3">
              {recentActivity.map((item) => (
                <div key={item} className="rounded border border-copper/25 bg-[#101211] p-3 text-sm text-sand">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
