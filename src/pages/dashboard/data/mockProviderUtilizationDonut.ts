import type { DepartmentLoadData } from "../types";

export const MOCK_PROVIDER_UTILIZATION_DONUT: DepartmentLoadData = {
  occupiedPct: 68,
  segments: [
    {
      id: "cardio",
      label: "Cardiology",
      count: 312,
      pct: 35,
      color: "#38bdf8",
    },
    { id: "icu", label: "ICU & Acute", count: 198, pct: 23, color: "#fb7185" },
    { id: "onco", label: "Oncology", count: 172, pct: 20, color: "#a78bfa" },
    {
      id: "other",
      label: "Other specialties",
      count: 197,
      pct: 22,
      color: "#fb923c",
    },
  ],
};
