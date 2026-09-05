import {
  Database,
  CheckCircle2,
  Clock,
  XCircle,
  Users,
  UserCheck,
  ScanLine,
  Sparkles,
  Upload,
  ShieldCheck,
} from "lucide-react";
import AppLayout from "../../layouts/AppLayout";
import StatsCard from "../../components/cards/StatsCard";
import ProgressCard from "../../components/cards/ProgressCard";
import BarChart from "../../components/dashboard/BarChart";
import DataTable from "../../components/tables/DataTable";
import { adminStats, districts, activityFeed } from "../../services/mockData";

const ICONS = { upload: Upload, ocr: ScanLine, verify: ShieldCheck };

function AdminDashboard() {
  const columns = [
    { key: "name", header: "District", keyField: "name" },
    { key: "records", header: "Total Records", render: (d) => d.records.toLocaleString() },
    { key: "verified", header: "Verified", render: (d) => d.verified.toLocaleString() },
    { key: "pending", header: "Pending", render: (d) => d.pending.toLocaleString() },
    {
      key: "progress",
      header: "Completion",
      render: (d) => {
        const pct = Math.round((d.verified / d.records) * 100);
        return (
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-24 overflow-hidden rounded-full bg-secondary">
              <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
            </div>
            <span className="text-xs font-semibold">{pct}%</span>
          </div>
        );
      },
    },
  ];

  return (
    <AppLayout role="admin" title="Admin Dashboard" subtitle="State-wide digitization monitoring">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard label="Total Records" value={adminStats.totalRecords.toLocaleString()} icon={Database} delta="+386" hint="today" />
        <StatsCard label="Verified Records" value={adminStats.verified.toLocaleString()} icon={CheckCircle2} tone="success" hint="78.7% of total" />
        <StatsCard label="Pending Records" value={adminStats.pending.toLocaleString()} icon={Clock} tone="warning" hint="avg wait 1.6 days" />
        <StatsCard label="Rejected Records" value={adminStats.rejected.toLocaleString()} icon={XCircle} tone="danger" hint="5.2% rejection" />
        <StatsCard label="Operators" value={adminStats.operators} icon={Users} tone="info" hint="132 active today" />
        <StatsCard label="Verifiers" value={adminStats.verifiers} icon={UserCheck} tone="info" hint="38 active today" />
        <StatsCard label="OCR Accuracy" value={`${adminStats.ocrAccuracy}%`} icon={ScanLine} tone="success" delta="+1.2%" />
        <StatsCard label="AI Extraction Accuracy" value={`${adminStats.aiAccuracy}%`} icon={Sparkles} tone="success" delta="+0.8%" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <BarChart
            title="District Wise Records"
            subtitle="Verified vs pending records per district"
            data={districts.map((d) => ({ label: d.name, verified: d.verified, pending: d.pending }))}
            series={[
              { key: "verified", label: "Verified", color: "bg-primary" },
              { key: "pending", label: "Pending", color: "bg-warning/70" },
            ]}
          />
        </div>
        <div className="space-y-4">
          <ProgressCard
            title="Overall Digitization Progress"
            subtitle={`${adminStats.verified.toLocaleString()} of ${adminStats.totalRecords.toLocaleString()} records`}
            percent={adminStats.digitizationProgress}
            footer="Target: 100% of legacy registers by Mar 2027"
          />
          <div className="surface p-5">
            <h3 className="text-sm font-semibold">Recent Activity Feed</h3>
            <ul className="mt-4 space-y-3.5">
              {activityFeed.map((a) => {
                const Icon = ICONS[a.type] || Upload;
                return (
                  <li key={a.text} className="flex gap-3">
                    <span className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-primary-soft text-primary">
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-xs leading-relaxed">
                      <span className="text-foreground">{a.text}</span>
                      <span className="block text-muted-foreground">{a.time}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="mb-3 text-sm font-semibold">District Statistics</h2>
        <DataTable columns={columns} rows={districts} keyField="name" />
      </div>
    </AppLayout>
  );
}

export default AdminDashboard;
