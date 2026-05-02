import type {
  AnalyticsSummaryMetric,
  EfficiencyScoreBlock,
  OperationalMetric,
  TopDiagnosisItem,
} from "../types";

export const MOCK_ANALYTICS_SUMMARY: AnalyticsSummaryMetric[] = [
  {
    id: "patients",
    title: "Total Patients",
    value: "1,284",
    trendBadge: "▲ 8.2%",
    trendUp: true,
    subtext: "vs last month",
    iconBg: "rgba(167,139,250,0.14)",
    iconColor: "#c4b5fd",
  },
  {
    id: "recovered",
    title: "Recovered Today",
    value: "47",
    trendBadge: "▲ 12.4%",
    trendUp: true,
    subtext: "vs yesterday",
    iconBg: "rgba(52,211,153,0.14)",
    iconColor: "#34d399",
  },
  {
    id: "appointments",
    title: "Appointments",
    value: "138",
    trendBadge: "▼ 3.1%",
    trendUp: false,
    subtext: "vs avg",
    iconBg: "rgba(250,204,21,0.12)",
    iconColor: "#facc15",
  },
  {
    id: "recovery",
    title: "Avg. Recovery Days",
    value: "6.3",
    trendBadge: "▲ 0.8d",
    trendUp: true,
    subtext: "improved",
    iconBg: "rgba(56,189,248,0.14)",
    iconColor: "#38bdf8",
  },
];

export const MOCK_TOP_DIAGNOSES: TopDiagnosisItem[] = [
  { id: "d1", label: "Hypertension", count: 214, trendLabel: "▲ 5.2%", trendUp: true },
  { id: "d2", label: "Type 2 Diabetes", count: 187, trendLabel: "▼ 1.1%", trendUp: false },
  { id: "d3", label: "Arrhythmia", count: 142, trendLabel: "▲ 3.8%", trendUp: true },
  { id: "d4", label: "Acute Asthma", count: 96, trendLabel: "▼ 0.4%", trendUp: false },
  { id: "d5", label: "Hypothyroidism", count: 88, trendLabel: "▲ 2.2%", trendUp: true },
  { id: "d6", label: "Pneumonia", count: 71, trendLabel: "▼ 4.0%", trendUp: false },
];

export const MOCK_OPERATIONAL_METRICS: OperationalMetric[] = [
  {
    id: "o1",
    label: "Avg. Wait Time",
    value: "18 min",
    trendLine: "▼ 2min vs last month",
    trendUp: false,
  },
  {
    id: "o2",
    label: "Bed Turnover",
    value: "2.4x",
    trendLine: "▲ 0.3x improved",
    trendUp: true,
  },
  {
    id: "o3",
    label: "Readmission Rate",
    value: "4.7%",
    trendLine: "▼ 0.8% vs target",
    trendUp: false,
  },
  {
    id: "o4",
    label: "Staff Satisfaction",
    value: "84%",
    trendLine: "▲ 6% this quarter",
    trendUp: true,
  },
];

export const MOCK_EFFICIENCY_SCORE: EfficiencyScoreBlock = {
  score: 87,
  title: "Efficiency Score",
  subtitle: "Above clinic benchmark by 11 pts",
};
