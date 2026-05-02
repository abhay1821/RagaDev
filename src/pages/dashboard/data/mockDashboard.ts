import type { CriticalPatientRow, DashboardKpi } from "../types";

export const MOCK_KPIS: DashboardKpi[] = [
  {
    id: "patients",
    label: "Total Patients",
    value: "1,284",
    trendLabel: "+8.2%",
    vsPeriod: "vs last month",
    trendUp: true,
    accent: "#f472b6",
  },
  {
    id: "recovered",
    label: "Recovered Today",
    value: "47",
    trendLabel: "+12.4%",
    vsPeriod: "vs yesterday",
    trendUp: true,
    accent: "#34d399",
  },
  {
    id: "appointments",
    label: "Appointments",
    value: "138",
    trendLabel: "-3.1%",
    vsPeriod: "vs avg",
    trendUp: false,
    accent: "#fb923c",
  },
  {
    id: "recovery",
    label: "Avg. Recovery Days",
    value: "6.3",
    trendLabel: "+0.8 days improved",
    vsPeriod: "",
    trendUp: true,
    accent: "#a78bfa",
  },
];

export const MOCK_CRITICAL_PATIENTS: CriticalPatientRow[] = [
  {
    id: "1",
    name: "Arun Mehta",
    patientRef: "#P-00281",
    department: "ICU",
    doctor: "Dr. Sharma",
    status: "Critical",
  },
  {
    id: "2",
    name: "Lisa Wong",
    patientRef: "#P-00294",
    department: "Cardiology",
    doctor: "Dr. Kapoor",
    status: "Under Review",
  },
  {
    id: "3",
    name: "Samir Patel",
    patientRef: "#P-00301",
    department: "Oncology",
    doctor: "Dr. Rao",
    status: "Stable",
  },
  {
    id: "4",
    name: "Nina Kulkarni",
    patientRef: "#P-00277",
    department: "ICU",
    doctor: "Dr. Singh",
    status: "Critical",
  },
];
