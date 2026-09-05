import { Link } from "@tanstack/react-router";
import { Upload, Clock, CheckCircle2, XCircle, ArrowUpRight } from "lucide-react";
import AppLayout from "../../layouts/AppLayout";
import StatsCard from "../../components/cards/StatsCard";
import ProgressCard from "../../components/cards/ProgressCard";
import BarChart from "../../components/dashboard/BarChart";
import DataTable from "../../components/tables/DataTable";
import StatusBadge from "../../components/ui/StatusBadge";
import Button from "../../components/ui/Button";
import { monthlyUploads, records } from "../../services/mockData";

function OperatorDashboard() {
  const recent = records.slice(0, 6);

  const columns = [
    { key: "id", header: "Record ID", render: (r) => <span className="font-semibold">{r.id}</span> },
    { key: "owner", header: "Owner" },
    { key: "village", header: "Village" },
    { key: "uploadedOn", header: "Uploaded" },
    { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
    {
      key: "action",
      header: "",
      render: () => (
        <Link to="/operator/result">
          <Button variant="soft" size="sm">
            View
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <AppLayout role="operator" title="Operator Dashboard" subtitle="Digitization activity overview">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard label="Total Uploads" value="1,284" icon={Upload} delta="+8.4%" hint="this month" />
        <StatsCard label="Pending Verification" value="96" icon={Clock} tone="warning" hint="avg wait 1.4 days" />
        <StatsCard label="Verified Records" value="1,102" icon={CheckCircle2} tone="success" delta="+112" hint="last 30 days" />
        <StatsCard label="Rejected Records" value="86" icon={XCircle} tone="danger" hint="6.7% of total" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <BarChart
            title="Monthly Upload Statistics"
            subtitle="Uploads vs verified records"
            data={monthlyUploads.map((m) => ({ ...m, label: m.month }))}
            series={[
              { key: "uploads", label: "Uploads", color: "bg-primary" },
              { key: "verified", label: "Verified", color: "bg-info/60" },
            ]}
          />
        </div>
        <div className="space-y-4">
          <ProgressCard
            title="Monthly Target"
            subtitle="820 of 1,000 records"
            percent={82}
            footer="On track to complete by 28 Sep"
          />
          <div className="surface p-5">
            <h3 className="text-sm font-semibold">Quick Actions</h3>
            <div className="mt-4 space-y-2">
              <Link to="/operator/upload" className="block">
                <Button className="w-full" icon={Upload}>
                  Upload New Record
                </Button>
              </Link>
              <Link to="/operator/uploads" className="block">
                <Button variant="outline" className="w-full" icon={ArrowUpRight}>
                  View My Uploads
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="mb-3 text-sm font-semibold">Recent Upload Activity</h2>
        <DataTable columns={columns} rows={recent} />
      </div>
    </AppLayout>
  );
}

export default OperatorDashboard;
