export type AnalyticsSummaryMetric = {
  id: string;
  title: string;
  value: string;
  trendBadge: string;
  trendUp: boolean;
  subtext: string;
  iconBg: string;
  iconColor: string;
};

export type TopDiagnosisItem = {
  id: string;
  label: string;
  count: number;
  trendLabel: string;
  trendUp: boolean;
};

export type OperationalMetric = {
  id: string;
  label: string;
  value: string;
  trendLine: string;
  trendUp: boolean;
};

export type EfficiencyScoreBlock = {
  score: number;
  title: string;
  subtitle: string;
};
