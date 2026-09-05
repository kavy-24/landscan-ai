export const districts = [
  { name: "Pune", records: 4820, verified: 3960, pending: 620, rejected: 240, accuracy: 96 },
  { name: "Nashik", records: 3610, verified: 2870, pending: 540, rejected: 200, accuracy: 94 },
  { name: "Nagpur", records: 2980, verified: 2210, pending: 610, rejected: 160, accuracy: 92 },
  { name: "Aurangabad", records: 2240, verified: 1680, pending: 430, rejected: 130, accuracy: 91 },
  { name: "Solapur", records: 1890, verified: 1490, pending: 320, rejected: 80, accuracy: 93 },
  { name: "Kolhapur", records: 1520, verified: 1210, pending: 240, rejected: 70, accuracy: 95 },
];

export const monthlyUploads = [
  { month: "Jan", uploads: 320, verified: 280, accuracy: 89 },
  { month: "Feb", uploads: 410, verified: 350, accuracy: 90 },
  { month: "Mar", uploads: 480, verified: 420, accuracy: 91 },
  { month: "Apr", uploads: 530, verified: 470, accuracy: 92 },
  { month: "May", uploads: 610, verified: 540, accuracy: 94 },
  { month: "Jun", uploads: 720, verified: 640, accuracy: 95 },
  { month: "Jul", uploads: 810, verified: 720, accuracy: 96 },
  { month: "Aug", uploads: 760, verified: 690, accuracy: 96 },
];

const villages = ["Wagholi", "Shirur", "Baramati", "Junnar", "Indapur", "Khed", "Daund"];
const talukas = ["Haveli", "Shirur", "Baramati", "Junnar", "Indapur", "Khed", "Daund"];

export const records = Array.from({ length: 24 }).map((_, i) => {
  const status = ["pending", "approved", "rejected", "processing"][i % 4];
  const district = districts[i % districts.length].name;
  return {
    id: `BSR-2026-${String(1041 + i).padStart(4, "0")}`,
    owner: [
      "Ramesh Patil",
      "Sunita Deshmukh",
      "Anil Jadhav",
      "Kavita Shinde",
      "Mahesh Kulkarni",
      "Pooja More",
      "Dattatray Pawar",
      "Nilesh Bhosale",
    ][i % 8],
    fatherName: ["Shankar Patil", "Vithal Deshmukh", "Baban Jadhav", "Ganpat Shinde"][i % 4],
    khasra: `${112 + i}/${(i % 5) + 1}`,
    survey: `SUR-${4200 + i * 3}`,
    village: villages[i % villages.length],
    taluka: talukas[i % talukas.length],
    district,
    state: "Maharashtra",
    area: `${(0.6 + (i % 7) * 0.35).toFixed(2)} hectare`,
    year: 1974 + (i % 30),
    status,
    priority: ["high", "medium", "low"][i % 3],
    confidence: 72 + ((i * 7) % 27),
    uploadedBy: ["op.ramesh", "op.sneha", "op.arjun"][i % 3],
    uploadedOn: `2026-0${(i % 8) + 1}-${String((i % 27) + 1).padStart(2, "0")}`,
    pages: (i % 3) + 1,
    fileName: `land_record_${1041 + i}.pdf`,
  };
});

export const recordById = (id) => records.find((r) => r.id === id) || records[0];

export const sampleOcrText = `?????? ????? / VILLAGE FORM VII
Khasra No. 118/3    Survey No. SUR-4218
Owner: Ramesh Shankar Patil
Father's Name: Shankar Patil
Village: Wagholi   Taluka: Haveli
District: Pune   State: Maharashtra
Area: 1.25 hectare (irrigated)
Mutation Entry Year: 1987
Remarks: partial faded entry in column 4, boundary line unclear`;

export const lowConfidenceTokens = ["1987", "column 4", "boundary line unclear", "SUR-4218"];

export const structuredFields = [
  { key: "ownerName", label: "Owner Name", value: "Ramesh Shankar Patil", confidence: 97 },
  { key: "fatherName", label: "Father Name", value: "Shankar Patil", confidence: 95 },
  { key: "khasra", label: "Khasra Number", value: "118/3", confidence: 93 },
  { key: "survey", label: "Survey Number", value: "SUR-4218", confidence: 78 },
  { key: "village", label: "Village", value: "Wagholi", confidence: 96 },
  { key: "taluka", label: "Taluka", value: "Haveli", confidence: 92 },
  { key: "district", label: "District", value: "Pune", confidence: 98 },
  { key: "state", label: "State", value: "Maharashtra", confidence: 99 },
  { key: "area", label: "Land Area", value: "1.25 hectare", confidence: 88 },
  { key: "year", label: "Record Year", value: "1987", confidence: 71 },
];

export const validationWarnings = [
  { type: "warning", message: "Record Year confidence below 75% — manual confirmation advised." },
  { type: "warning", message: "Survey Number partially faded in source scan." },
  { type: "info", message: "No duplicate Khasra entry found for Wagholi (Haveli)." },
  { type: "error", message: "Missing field: Mutation Reference Number." },
];

export const users = [
  { id: "U-1001", name: "Ramesh Kulkarni", email: "op.ramesh@gov.in", role: "operator", district: "Pune", status: "active", lastActive: "2 min ago" },
  { id: "U-1002", name: "Sneha Rane", email: "op.sneha@gov.in", role: "operator", district: "Nashik", status: "active", lastActive: "18 min ago" },
  { id: "U-1003", name: "Arjun Salvi", email: "op.arjun@gov.in", role: "operator", district: "Nagpur", status: "disabled", lastActive: "6 days ago" },
  { id: "U-1004", name: "Vaishali Joshi", email: "vf.vaishali@gov.in", role: "verifier", district: "Pune", status: "active", lastActive: "1 hr ago" },
  { id: "U-1005", name: "Prakash Naik", email: "vf.prakash@gov.in", role: "verifier", district: "Solapur", status: "active", lastActive: "35 min ago" },
  { id: "U-1006", name: "Meera Iyer", email: "admin.meera@gov.in", role: "admin", district: "State HQ", status: "active", lastActive: "Just now" },
  { id: "U-1007", name: "Sagar Kadam", email: "vf.sagar@gov.in", role: "verifier", district: "Kolhapur", status: "active", lastActive: "3 hrs ago" },
];

export const activityFeed = [
  { type: "upload", text: "op.ramesh uploaded 12 scanned records for Wagholi", time: "4 min ago" },
  { type: "ocr", text: "OCR completed on BSR-2026-1058 with 96% confidence", time: "11 min ago" },
  { type: "verify", text: "vf.vaishali approved BSR-2026-1049", time: "27 min ago" },
  { type: "verify", text: "vf.prakash rejected BSR-2026-1044 (illegible boundary)", time: "1 hr ago" },
  { type: "ocr", text: "AI extraction re-run queued for 3 low-confidence records", time: "2 hrs ago" },
  { type: "upload", text: "op.sneha uploaded 8 scanned records for Junnar", time: "3 hrs ago" },
];

export const notifications = [
  { title: "5 records awaiting your review", detail: "Verification queue updated", time: "5 min ago" },
  { title: "OCR engine health: normal", detail: "Average latency 4.2s / page", time: "1 hr ago" },
  { title: "Monthly digitization target 82% met", detail: "State dashboard", time: "Yesterday" },
];

export const adminStats = {
  totalRecords: 17060,
  verified: 13420,
  pending: 2760,
  rejected: 880,
  operators: 148,
  verifiers: 42,
  ocrAccuracy: 96.4,
  aiAccuracy: 94.1,
  digitizationProgress: 78,
  avgProcessingTime: "42 sec",
  processedToday: 386,
};
