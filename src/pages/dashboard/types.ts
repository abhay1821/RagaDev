export type DashboardKpi = {
  id: string;
  label: string;
  value: string;
  trendLabel: string;
  vsPeriod: string;
  trendUp: boolean | null;
  accent: string;
};

export type CriticalPatientRow = {
  id: string;
  name: string;
  patientRef: string;
  department: string;
  doctor: string;
  status: "Critical" | "Under Review" | "Stable" | "Discharged";
};

export type ProviderBookedSlot = {
  id: string;
  time: string;
  date: string;
  patientName: string;
  visitCode: string;
};

export type ProviderUtilizationCard = {
  id: string;
  name: string;
  specialty: string;
  location: string;
  utilizationPct: number;
  bookedSlots: number;
  totalSlots: number;
  slots: ProviderBookedSlot[];
};

export type ProviderUtilizationSummary = {
  clinicAveragePct: number;
  providers: ProviderUtilizationCard[];
};

export type DepartmentLoadSegment = {
  id: string;
  label: string;
  count: number;
  pct: number;
  color: string;
};

export type DepartmentLoadData = {
  occupiedPct: number;
  segments: DepartmentLoadSegment[];
};
