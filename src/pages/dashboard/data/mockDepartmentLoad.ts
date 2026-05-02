import type { DepartmentLoadData } from "../types";
export const MOCK_DEPARTMENT_LOAD: DepartmentLoadData = {
  occupiedPct: 82,
  segments: [
    {
      id: "cardio",
      label: "Cardiology",
      count: 312,
      pct: 38,
      color: "#38bdf8",
    },
    { id: "icu", label: "ICU", count: 198, pct: 24, color: "#fb7185" },
    { id: "onco", label: "Oncology", count: 148, pct: 18, color: "#a78bfa" },
    {
      id: "other",
      label: "Other Units",
      count: 164,
      pct: 20,
      color: "#fb923c",
    },
  ],
};
