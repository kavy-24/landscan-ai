import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Pencil, RefreshCcw, Sparkles, Download, Send, Save } from "lucide-react";
import AppLayout from "../../layouts/AppLayout";
import DocumentPreview from "../../components/dashboard/DocumentPreview";
import OcrTextPanel from "../../components/dashboard/OcrTextPanel";
import StructuredDataForm from "../../components/forms/StructuredDataForm";
import ValidationPanel from "../../components/dashboard/ValidationPanel";
import Button from "../../components/ui/Button";
import StatusBadge from "../../components/ui/StatusBadge";
import { structuredFields, validationWarnings } from "../../services/mockData";

function OcrResult() {
  const navigate = useNavigate();
  const [fields, setFields] = useState(structuredFields);
  const [editable, setEditable] = useState(false);
  const [toast, setToast] = useState("");

  const overall = Math.round(fields.reduce((a, f) => a + f.confidence, 0) / fields.length);

  const notify = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2600);
  };

  const update = (key, value) =>
    setFields((prev) => prev.map((f) => (f.key === key ? { ...f, value } : f)));

  return (
    <AppLayout role="operator" title="OCR Result" subtitle="BSR-2026-1058 · AI structured extraction">
      {toast ? (
        <div className="mb-4 rounded-lg bg-primary-soft px-4 py-3 text-sm font-medium text-primary">
          {toast}
        </div>
      ) : null}

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status="processing" label="Awaiting submission" />
          <span className="text-xs text-muted-foreground">
            Extracted 12 Sep 2026 · Gemini 1.5 Pro · 2 pages
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" icon={RefreshCcw} onClick={() => notify("OCR re-run queued for this document.")}>
            Re-run OCR
          </Button>
          <Button variant="outline" size="sm" icon={Sparkles} onClick={() => notify("AI extraction re-run started.")}>
            Re-run AI Extraction
          </Button>
          <Button variant="outline" size="sm" icon={Download} onClick={() => notify("Validation report downloaded (mock).")}>
            Download Report
          </Button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="space-y-4">
          <DocumentPreview />
          <OcrTextPanel />
        </div>

        <div className="space-y-4">
          <div className="surface p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">AI Structured Data</h3>
              <Button
                variant={editable ? "success" : "soft"}
                size="sm"
                icon={editable ? Save : Pencil}
                onClick={() => {
                  if (editable) notify("Changes saved to draft record.");
                  setEditable(!editable);
                }}
              >
                {editable ? "Save Data" : "Edit Data"}
              </Button>
            </div>
            <div className="mt-4">
              <StructuredDataForm fields={fields} editable={editable} onChange={update} />
            </div>
          </div>

          <ValidationPanel
            overall={overall}
            warnings={validationWarnings}
            missing={["Mutation Reference Number"]}
          />

          <div className="surface flex flex-wrap items-center justify-between gap-3 p-5">
            <p className="text-sm text-muted-foreground">
              Once submitted, this record moves to the verifier queue for approval.
            </p>
            <Button icon={Send} onClick={() => navigate({ to: "/operator/uploads" })}>
              Send For Verification
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default OcrResult;
