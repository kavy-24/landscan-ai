import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { CheckCircle2, XCircle, RefreshCcw, Save } from "lucide-react";
import AppLayout from "../../layouts/AppLayout";
import DocumentPreview from "../../components/dashboard/DocumentPreview";
import OcrTextPanel from "../../components/dashboard/OcrTextPanel";
import StructuredDataForm from "../../components/forms/StructuredDataForm";
import ValidationPanel from "../../components/dashboard/ValidationPanel";
import Button from "../../components/ui/Button";
import StatusBadge from "../../components/ui/StatusBadge";
import { structuredFields, validationWarnings } from "../../services/mockData";

function ReviewRecord() {
  const navigate = useNavigate();
  const [fields, setFields] = useState(structuredFields);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("pending");
  const [toast, setToast] = useState("");

  const overall = Math.round(fields.reduce((a, f) => a + f.confidence, 0) / fields.length);
  const notify = (m) => {
    setToast(m);
    setTimeout(() => setToast(""), 2600);
  };

  return (
    <AppLayout role="verifier" title="Review Record" subtitle="BSR-2026-1058 · Wagholi, Haveli, Pune">
      {toast ? (
        <div className="mb-4 rounded-lg bg-primary-soft px-4 py-3 text-sm font-medium text-primary">
          {toast}
        </div>
      ) : null}

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <StatusBadge status={status} />
          <span className="text-xs text-muted-foreground">
            Submitted by op.ramesh · 12 Sep 2026 · priority high
          </span>
        </div>
        <Button variant="ghost" size="sm" onClick={() => navigate({ to: "/verifier/queue" })}>
          Back to queue
        </Button>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="space-y-4">
          <DocumentPreview />
          <OcrTextPanel />
        </div>

        <div className="space-y-4">
          <div className="surface p-5">
            <h3 className="text-sm font-semibold">Editable Structured Data</h3>
            <div className="mt-4">
              <StructuredDataForm
                fields={fields}
                editable
                onChange={(key, value) =>
                  setFields((prev) => prev.map((f) => (f.key === key ? { ...f, value } : f)))
                }
              />
            </div>
          </div>

          <ValidationPanel
            overall={overall}
            warnings={validationWarnings}
            missing={["Mutation Reference Number"]}
          />

          <div className="surface p-5">
            <h3 className="text-sm font-semibold">Verification Notes</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="Record your observations, corrections or reasons for rejection..."
              className="mt-3 w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
            />
            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                variant="success"
                icon={CheckCircle2}
                onClick={() => {
                  setStatus("approved");
                  notify("Record approved and pushed to the verified registry.");
                }}
              >
                Approve Record
              </Button>
              <Button
                variant="danger"
                icon={XCircle}
                onClick={() => {
                  setStatus("rejected");
                  notify("Record rejected. Operator has been notified.");
                }}
              >
                Reject Record
              </Button>
              <Button variant="outline" icon={RefreshCcw} onClick={() => notify("Reprocessing requested from OCR pipeline.")}>
                Request Reprocessing
              </Button>
              <Button variant="soft" icon={Save} onClick={() => notify("Changes saved.")}>
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default ReviewRecord;
