import { Download, FileSpreadsheet } from "lucide-react";
import { PageHeader } from "../components/common/PageHeader";
import { Button } from "../components/ui/Button";

export function ExportPage() {
  return (
    <>
      <PageHeader title="Export" description="Download lead data for reporting and handoff." />
      <section className="p-4 md:p-6">
        <div className="panel flex flex-col gap-5 rounded p-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <FileSpreadsheet className="text-warning" size={32} />
            <div>
              <h2 className="font-semibold text-ink">Leads CSV</h2>
              <p className="mt-1 text-sm text-sand/70">Export support is ready for the lead dataset.</p>
            </div>
          </div>
          <Button type="button">
            <Download size={18} />
            Export CSV
          </Button>
        </div>
      </section>
    </>
  );
}
