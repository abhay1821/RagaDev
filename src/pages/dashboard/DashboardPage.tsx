import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import { brand } from "../../app/theme/theme";
import { usePatientStore } from "../../stores/patientStore";
import { MOCK_CRITICAL_PATIENTS, MOCK_KPIS } from "./data/mockDashboard";
import { CriticalPatientsCard } from "./components/CriticalPatientsCard";
import { ProviderUtilizationDonutCard } from "./components/ProviderUtilizationDonutCard";
import { KpiSummaryCards } from "./components/KpiSummaryCards";
import { ProviderUtilizationSection } from "./components/ProviderUtilizationSection";
import { MOCK_PROVIDER_UTILIZATION } from "./data/mockProviderUtilization";
import { MOCK_PROVIDER_UTILIZATION_DONUT } from "./data/mockProviderUtilizationDonut";

export default function DashboardPage() {
  const registryCount = usePatientStore((s) => s.patients.length);

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
      <Paper
        elevation={0}
        sx={{
          mb: 2,
          px: 2,
          py: 1.5,
          bgcolor: "rgba(52,211,153,0.06)",
          border: `1px solid ${brand.border}`,
          borderRadius: 2,
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          sx={{ justifyContent: "space-between", alignItems: { sm: "center" } }}
        >
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 700, color: brand.emerald }}
          >
            Patient registry
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Total patients:{" "}
            <Box
              component="span"
              sx={{ color: "text.primary", fontWeight: 600 }}
            >
              {registryCount}
            </Box>
          </Typography>
        </Stack>
      </Paper>

      <Box sx={{ mb: 4 }}>
        <KpiSummaryCards items={MOCK_KPIS} />
      </Box>

      <ProviderUtilizationSection data={MOCK_PROVIDER_UTILIZATION} />

      <Grid container spacing={3.5}>
        <Grid size={{ xs: 12, lg: 7 }}>
          <CriticalPatientsCard rows={MOCK_CRITICAL_PATIENTS} />
        </Grid>
        <Grid size={{ xs: 12, lg: 5 }}>
          <ProviderUtilizationDonutCard
            data={MOCK_PROVIDER_UTILIZATION_DONUT}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
