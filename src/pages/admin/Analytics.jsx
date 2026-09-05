import AppLayout from "../../layouts/AppLayout";
import MetricCard from "../../components/cards/MetricCard";
import BarChart from "../../components/dashboard/BarChart";
import LineChart from "../../components/dashboard/LineChart";
import { adminStats, districts, monthlyUploads } from "../../services/mockData";

function Analytics() {
  return (
    <AppLayout role="admin" title="Analytics" subtitle="Pipeline accuracy and throughput insights">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="OCR Accuracy" value={adminStats.ocrAccuracy} unit="%" progress={adminStats.ocrAccuracy} description="Across 17,060 processed pages" />
        <MetricCard label="AI Extraction Accuracy" value={adminStats.aiAccuracy} unit="%" progress={adminStats.aiAccuracy} description="Gemini structured field mapping" />
        <MetricCard label="Verification Rate" value={86.4} unit="%" progress={86.4} description="Records verified within SLA" />
        <MetricCard label="Duplicate Detection Rate" value={3.2} unit="%" progress={32} description="546 duplicates auto-flagged" />
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        <BarChart
          title="Monthly Upload Trend"
          subtitle="Scanned records ingested per month"
          data={monthlyUploads.map((m) => ({ ...m, label: m.month }))}
          series={[{ key: "uploads", label: "Uploads", color: "bg-primary" }]}
        />
        <LineChart
          title="OCR Accuracy Trend"
          subtitle="Model accuracy improvement over time"
          data={monthlyUploads}
          valueKey="accuracy"
          suffix="%"
        />
        <BarChart
          title="Verification Trend"
          subtitle="Verified records per month"
          data={monthlyUploads.map((m) => ({ ...m, label: m.month }))}
          series={[{ key: "verified", label: "Verified", color: "bg-info/70" }]}
        />
        <BarChart
          title="District Performance"
          subtitle="Accuracy by district (%)"
          data={districts.map((d) => ({ label: d.name, accuracy: d.accuracy }))}
          series={[{ key: "accuracy", label: "Accuracy", color: "bg-success/75" }]}
        />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Average Processing Time" value={adminStats.avgProcessingTime} description="OCR + AI + validation per record" />
        <MetricCard label="Records Processed Today" value={adminStats.processedToday} description="Across 36 districts" />
        <MetricCard label="Pending Reviews" value={adminStats.pending.toLocaleString()} description="Assigned across 42 verifiers" />
        <MetricCard label="Rejected Records" value={adminStats.rejected.toLocaleString()} description="Most common cause: illegible scan" />
      </div>
    </AppLayout>
  );
}

export default Analytics;
