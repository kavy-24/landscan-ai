import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import AppLayout from "../../layouts/AppLayout";
import SearchBar from "../../components/ui/SearchBar";
import Select from "../../components/ui/Select";
import DataTable from "../../components/tables/DataTable";
import StatusBadge from "../../components/ui/StatusBadge";
import Button from "../../components/ui/Button";
import { records } from "../../services/mockData";

function MyUploads() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");

  const rows = useMemo(
    () =>
      records.filter((r) => {
        const q = query.toLowerCase();
        const match =
          !q ||
          r.id.toLowerCase().includes(q) ||
          r.owner.toLowerCase().includes(q) ||
          r.khasra.toLowerCase().includes(q) ||
          r.village.toLowerCase().includes(q);
        return match && (status === "all" || r.status === status);
      }),
    [query, status],
  );

  const columns = [
    { key: "id", header: "Record ID", render: (r) => <span className="font-semibold">{r.id}</span> },
    { key: "fileName", header: "File", render: (r) => <span className="text-muted-foreground">{r.fileName}</span> },
    { key: "owner", header: "Owner" },
    { key: "khasra", header: "Khasra" },
    { key: "village", header: "Village" },
    { key: "uploadedOn", header: "Uploaded" },
    { key: "confidence", header: "Confidence", render: (r) => `${r.confidence}%` },
    { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
    {
      key: "action",
      header: "",
      render: () => (
        <Link to="/operator/result">
          <Button variant="soft" size="sm">
            View Details
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <AppLayout role="operator" title="My Uploads" subtitle="Complete history of records you digitized">
      <div className="surface mb-4 flex flex-col gap-3 p-4 sm:flex-row sm:items-end">
        <SearchBar
          className="flex-1"
          value={query}
          onChange={setQuery}
          placeholder="Search by record ID, owner, khasra or village"
        />
        <Select
          className="sm:w-52"
          label="Status"
          value={status}
          onChange={setStatus}
          options={[
            { value: "all", label: "All statuses" },
            { value: "pending", label: "Pending" },
            { value: "processing", label: "Processing" },
            { value: "approved", label: "Approved" },
            { value: "rejected", label: "Rejected" },
          ]}
        />
      </div>

      <p className="mb-3 text-sm text-muted-foreground">
        Showing <span className="font-semibold text-foreground">{rows.length}</span> of{" "}
        {records.length} uploaded records
      </p>

      <DataTable
        columns={columns}
        rows={rows}
        emptyTitle="No uploads match your filters"
        emptyDescription="Try a different search term or reset the status filter."
      />
    </AppLayout>
  );
}

export default MyUploads;
