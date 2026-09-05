import { Link } from "@tanstack/react-router";
import { ClipboardList, CheckCircle2, XCircle, Timer } from "lucide-react";
import AppLayout from "../../layouts/AppLayout";
import StatsCard from "../../components/cards/StatsCard";
import ProgressCard from "../../components/cards/ProgressCard";
import BarChart from "../../components/dashboard/BarChart";
import DataTable from "../../components/tables/DataTable";
import StatusBadge from "../../components/ui/StatusBadge";
import Button from "../../components/ui/Button";
import { monthlyUploads, records, activityFeed } from "../../services/mockData";

function VerifierDashboard() {
  const queue = records.filter((r) => r.status === "pending").slice(0, 6);

  const columns = [
    { key: "id", header: "Record ID", render: (r) => <span className="font-semibold">{r.id}</span> },
    { key: "owner", header: "Owner" },
    { key: "village", header: "Village" },
    { key: "priority", header: "Priority", render: (r) => <StatusBadge status={r.priority} /> },
    { key: "confidence", header: "Confidence", render: (r) => `${r.confidence}%` },
    {
      key: "action",
      header: "",
      render: () => (
        <Link to="/verifier/review">
          <Button variant="soft" size="sm">
            Review
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <AppLayout role="verifier" title="Verifier Dashboard" subtitle="Records awaiting your verification">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard label="Pending In Queue" value="42" icon={ClipboardList} tone="warning" hint="12 high priority" />
        <StatsCard label="Approved By You" value="618" icon={CheckCircle2} tone="success" delta="+34" hint="this week" />
        <StatsCard label="Rejected By You" value="47" icon={XCircle} tone="danger" hint="7% rejection rate" />
        <StatsCard label="Avg Review Time" value="3m 12s" icon={Timer} tone="info" hint="target 4m" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <BarChart
            title="Verification Trend"
            subtitle="Records verified per month"
            data={monthlyUploads.map((m) => ({ ...m, label: m.month }))}
            series={[{ key: "verified", label: "Verified", color: "bg-primary" }]}
          />
        </div>
        <div className="space-y-4">
          <ProgressCard
            title="Weekly Verification Target"
            subtitle="164 of 200 records"
            percent={82}
            tone="success"
            footer="36 records remaining this week"
          />
          <div className="surface p-5">
            <h3 className="text-sm font-semibold">Recent Activity</h3>
            <ul className="mt-4 space-y-3">
              {activityFeed.slice(0, 4).map((a) => (
                <li key={a.text} className="flex gap-3 text-xs">
                  <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-primary" />
                  <span>
                    <span className="text-foreground">{a.text}</span>
                    <span className="block text-muted-foreground">{a.time}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="mb-3 text-sm font-semibold">Top Priority Records</h2>
        <DataTable columns={columns} rows={queue} />
      </div>
    </AppLayout>
  );
}

export default VerifierDashboard;
