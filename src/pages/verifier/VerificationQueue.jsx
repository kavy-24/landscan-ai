import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import AppLayout from "../../layouts/AppLayout";
import SearchBar from "../../components/ui/SearchBar";
import Select from "../../components/ui/Select";
import DataTable from "../../components/tables/DataTable";
import StatusBadge from "../../components/ui/StatusBadge";
import Button from "../../components/ui/Button";
import { records } from "../../services/mockData";

function VerificationQueue({ role = "verifier" }) {
  const [query, setQuery] = useState("");
  const [priority, setPriority] = useState("all");
  const [confidence, setConfidence] = useState("all");

  const rows = useMemo(
    () =>
      records
        .filter((r) => r.status === "pending" || r.status === "processing")
        .filter((r) => {
          const q = query.toLowerCase();
          const match =
            !q ||
            r.id.toLowerCase().includes(q) ||
            r.owner.toLowerCase().includes(q) ||
            r.khasra.toLowerCase().includes(q) ||
            r.village.toLowerCase().includes(q);
          const p = priority === "all" || r.priority === priority;
          const c =
            confidence === "all" ||
            (confidence === "high" && r.confidence >= 90) ||
            (confidence === "medium" && r.confidence >= 80 && r.confidence < 90) ||
            (confidence === "low" && r.confidence < 80);
          return match && p && c;
        }),
    [query, priority, confidence],
  );

  const columns = [
    { key: "id", header: "Record ID", render: (r) => <span className="font-semibold">{r.id}</span> },
    { key: "owner", header: "Owner" },
    { key: "khasra", header: "Khasra" },
    { key: "village", header: "Village" },
    { key: "district", header: "District" },
    { key: "priority", header: "Priority", render: (r) => <StatusBadge status={r.priority} /> },
    {
      key: "confidence",
      header: "Confidence",
      render: (r) => (
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-secondary">
            <div
              className={`h-full rounded-full ${
                r.confidence >= 90 ? "bg-success" : r.confidence >= 80 ? "bg-warning" : "bg-destructive"
              }`}
              style={{ width: `${r.confidence}%` }}
            />
          </div>
          <span className="text-xs font-semibold">{r.confidence}%</span>
        </div>
      ),
    },
    { key: "uploadedBy", header: "Operator" },
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
    <AppLayout
      role={role}
      title="Verification Queue"
      subtitle="Pending records sorted by priority and confidence"
    >
      <div className="surface mb-4 flex flex-col gap-3 p-4 lg:flex-row lg:items-end">
        <SearchBar
          className="flex-1"
          value={query}
          onChange={setQuery}
          placeholder="Search records by ID, owner, khasra or village"
        />
        <Select
          className="lg:w-48"
          label="Priority"
          value={priority}
          onChange={setPriority}
          options={[
            { value: "all", label: "All priorities" },
            { value: "high", label: "High" },
            { value: "medium", label: "Medium" },
            { value: "low", label: "Low" },
          ]}
        />
        <Select
          className="lg:w-52"
          label="Confidence"
          value={confidence}
          onChange={setConfidence}
          options={[
            { value: "all", label: "All confidence" },
            { value: "high", label: "High (90%+)" },
            { value: "medium", label: "Medium (80-89%)" },
            { value: "low", label: "Low (below 80%)" },
          ]}
        />
      </div>

      <p className="mb-3 text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">{rows.length}</span> records pending review
      </p>

      <DataTable
        columns={columns}
        rows={rows}
        emptyTitle="Queue is clear"
        emptyDescription="No pending records match these filters. Great work!"
      />
    </AppLayout>
  );
}

export default VerificationQueue;
