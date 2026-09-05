import { useMemo, useState } from "react";
import { UserPlus, Pencil, Ban, CheckCircle2 } from "lucide-react";
import AppLayout from "../../layouts/AppLayout";
import SearchBar from "../../components/ui/SearchBar";
import Select from "../../components/ui/Select";
import DataTable from "../../components/tables/DataTable";
import StatusBadge from "../../components/ui/StatusBadge";
import Button from "../../components/ui/Button";
import { users as seedUsers } from "../../services/mockData";

function UserManagement() {
  const [list, setList] = useState(seedUsers);
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [draft, setDraft] = useState({ name: "", email: "", role: "operator", district: "Pune" });

  const rows = useMemo(
    () =>
      list.filter((u) => {
        const q = query.toLowerCase();
        const match = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
        return match && (role === "all" || u.role === role);
      }),
    [list, query, role],
  );

  const toggle = (id) =>
    setList((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === "active" ? "disabled" : "active" } : u,
      ),
    );

  const columns = [
    {
      key: "name",
      header: "User",
      render: (u) => (
        <div>
          <p className="font-semibold">{u.name}</p>
          <p className="text-xs text-muted-foreground">{u.email}</p>
        </div>
      ),
    },
    { key: "id", header: "User ID" },
    { key: "role", header: "Role", render: (u) => <StatusBadge status={u.role} /> },
    { key: "district", header: "District" },
    { key: "lastActive", header: "Last Active" },
    { key: "status", header: "Status", render: (u) => <StatusBadge status={u.status} /> },
    {
      key: "actions",
      header: "",
      render: (u) => (
        <div className="flex justify-end gap-2">
          <Button variant="outline" size="sm" icon={Pencil}>
            Edit
          </Button>
          <Button
            variant={u.status === "active" ? "danger" : "success"}
            size="sm"
            icon={u.status === "active" ? Ban : CheckCircle2}
            onClick={() => toggle(u.id)}
          >
            {u.status === "active" ? "Disable" : "Enable"}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <AppLayout role="admin" title="User Management" subtitle="Manage operators, verifiers and administrators">
      <div className="surface mb-4 flex flex-col gap-3 p-4 lg:flex-row lg:items-end">
        <SearchBar className="flex-1" value={query} onChange={setQuery} placeholder="Search users by name or email" />
        <Select
          className="lg:w-48"
          label="Role"
          value={role}
          onChange={setRole}
          options={[
            { value: "all", label: "All roles" },
            { value: "admin", label: "Admin" },
            { value: "operator", label: "Operator" },
            { value: "verifier", label: "Verifier" },
          ]}
        />
        <Button icon={UserPlus} onClick={() => setShowForm((v) => !v)}>
          Add User
        </Button>
      </div>

      {showForm ? (
        <div className="surface mb-4 p-5">
          <h3 className="text-sm font-semibold">Add New User</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div>
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Full Name
              </span>
              <input
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                className="w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
            </div>
            <div>
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Official Email
              </span>
              <input
                value={draft.email}
                onChange={(e) => setDraft({ ...draft, email: e.target.value })}
                className="w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
            </div>
            <Select
              label="Role"
              value={draft.role}
              onChange={(v) => setDraft({ ...draft, role: v })}
              options={[
                { value: "operator", label: "Operator" },
                { value: "verifier", label: "Verifier" },
                { value: "admin", label: "Admin" },
              ]}
            />
            <Select
              label="District"
              value={draft.district}
              onChange={(v) => setDraft({ ...draft, district: v })}
              options={["Pune", "Nashik", "Nagpur", "Solapur", "State HQ"].map((d) => ({ value: d, label: d }))}
            />
          </div>
          <div className="mt-4 flex gap-2">
            <Button
              disabled={!draft.name || !draft.email}
              onClick={() => {
                setList((prev) => [
                  {
                    ...draft,
                    id: `U-${1008 + prev.length}`,
                    status: "active",
                    lastActive: "Just now",
                  },
                  ...prev,
                ]);
                setDraft({ name: "", email: "", role: "operator", district: "Pune" });
                setShowForm(false);
              }}
            >
              Create User
            </Button>
            <Button variant="outline" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
          </div>
        </div>
      ) : null}

      <p className="mb-3 text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">{rows.length}</span> users
      </p>

      <DataTable
        columns={columns}
        rows={rows}
        emptyTitle="No users found"
        emptyDescription="Try a different name, email or role filter."
      />
    </AppLayout>
  );
}

export default UserManagement;
