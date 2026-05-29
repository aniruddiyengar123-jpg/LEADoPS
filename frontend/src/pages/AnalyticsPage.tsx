import { BarChart3, PieChart, TrendingUp } from "lucide-react";
import { PageHeader } from "../components/common/PageHeader";

export function AnalyticsPage() {
  return (
    <>
      <PageHeader title="Analytics" description="Conversion, source mix, and status distribution." />
      <section className="grid gap-5 p-4 md:p-6 xl:grid-cols-3">
        {[
          { title: "Conversion Rate", value: "0%", icon: TrendingUp },
          { title: "Top Source", value: "No data", icon: PieChart },
          { title: "Lead Velocity", value: "0/day", icon: BarChart3 }
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="panel rounded p-5">
              <Icon className="text-warning" size={24} />
              <p className="mt-5 text-sm text-sand/65">{item.title}</p>
              <p className="mt-2 text-2xl font-semibold text-ink">{item.value}</p>
            </div>
          );
        })}
      </section>
    </>
  );
}
