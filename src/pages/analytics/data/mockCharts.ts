export const MOCK_ADMISSIONS_7D = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const,
  admissions: [55, 62, 72, 78, 71, 73, 75],
  discharges: [42, 46, 54, 58, 51, 54, 49],
};

export type ProviderUtilBarRow = {
  id: string;
  name: string;
  pct: number;
  barColor: string;
};

export const ANALYTICS_CLINIC_UTIL_AVG = 68;

export const MOCK_PROVIDER_UTIL_BARS: ProviderUtilBarRow[] = [
  { id: "1", name: "Dr. Ryan L.", pct: 55, barColor: "#f87171" },
  { id: "2", name: "Dr. Mei Wong", pct: 91, barColor: "#fbbf24" },
  { id: "3", name: "Dr. Hassan A.", pct: 72, barColor: "#a78bfa" },
  { id: "4", name: "Dr. Sharma", pct: 65, barColor: "#34d399" },
  { id: "5", name: "Dr. Kapoor", pct: 58, barColor: "#38bdf8" },
  { id: "6", name: "Dr. Chen L.", pct: 44, barColor: "#2dd4bf" },
];
