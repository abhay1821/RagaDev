import { Box, Grid, Typography } from "@mui/material";
import { AdmissionsDischargesCard } from "./components/AdmissionsDischargesCard";
import { AnalyticsSummaryCards } from "./components/AnalyticsSummaryCards";
import { OperationalStatsCard } from "./components/OperationalStatsCard";
import { ProviderUtilizationBarsCard } from "./components/ProviderUtilizationBarsCard";
import { TopDiagnosesCard } from "./components/TopDiagnosesCard";
import {
  MOCK_ANALYTICS_SUMMARY,
  MOCK_EFFICIENCY_SCORE,
  MOCK_OPERATIONAL_METRICS,
  MOCK_TOP_DIAGNOSES,
} from "./data/mockAnalytics";
import {
  ANALYTICS_CLINIC_UTIL_AVG,
  MOCK_PROVIDER_UTIL_BARS,
} from "./data/mockCharts";

export default function AnalyticsPage() {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1480,
        mx: "auto",
        px: { xs: 2, sm: 3 },
        py: { xs: 2, md: 3 },
      }}
    >
      <Typography
        variant="h5"
        component="h1"
        sx={{
          fontWeight: 700,
          fontFamily: '"Playfair Display", Georgia, serif',
          mb: 0.5,
        }}
      >
        Analytics
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Clinical volume, diagnoses, and operational performance.
      </Typography>

      <Box sx={{ mb: 4 }}>
        <AnalyticsSummaryCards items={MOCK_ANALYTICS_SUMMARY} />
      </Box>

      <Grid container spacing={3} sx={{ alignItems: "stretch", mb: 4 }}>
        <Grid size={{ xs: 12, lg: 7 }}>
          <AdmissionsDischargesCard />
        </Grid>
        <Grid size={{ xs: 12, lg: 5 }}>
          <ProviderUtilizationBarsCard
            items={MOCK_PROVIDER_UTIL_BARS}
            clinicAvgPct={ANALYTICS_CLINIC_UTIL_AVG}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3.5}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <TopDiagnosesCard items={MOCK_TOP_DIAGNOSES} />
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <OperationalStatsCard metrics={MOCK_OPERATIONAL_METRICS} efficiency={MOCK_EFFICIENCY_SCORE} />
        </Grid>
      </Grid>
    </Box>
  );
}
