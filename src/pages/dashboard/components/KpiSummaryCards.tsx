import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import HotelRoundedIcon from "@mui/icons-material/HotelRounded";
import MedicationRoundedIcon from "@mui/icons-material/MedicationRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import type { SvgIconComponent } from "@mui/icons-material";
import { brand } from "../../../app/theme/theme";
import type { DashboardKpi } from "../types";

const KPI_ICONS: Record<string, SvgIconComponent> = {
  patients: HotelRoundedIcon,
  recovered: TaskAltRoundedIcon,
  appointments: CalendarMonthOutlinedIcon,
  recovery: MedicationRoundedIcon,
};

function comparisonArrow(up: boolean | null): string {
  if (up === null) return "";
  return up ? "↑ " : "↓ ";
}

function trendColor(kpi: DashboardKpi): string {
  if (kpi.trendUp === null) return brand.muted;
  return kpi.trendUp ? "#34d399" : "#f87171";
}

function KpiCard({ kpi }: { kpi: DashboardKpi }) {
  const Icon = KPI_ICONS[kpi.id] ?? HotelRoundedIcon;
  const comparison = `${comparisonArrow(kpi.trendUp)}${kpi.trendLabel}${kpi.vsPeriod ? ` ${kpi.vsPeriod}` : ""}`;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.25,
        borderRadius: 2,
        border: `1px solid ${brand.border}`,
        bgcolor: "rgba(21,25,33,0.55)",
        overflow: "hidden",
        height: "100%",
        borderTop: `3px solid ${kpi.accent}`,
      }}
    >
      <Stack sx={{ alignItems: "flex-start", gap: 1.25 }}>
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: 1.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: alpha(kpi.accent, 0.14),
            border: `1px solid ${alpha(kpi.accent, 0.35)}`,
            color: kpi.accent,
          }}
        >
          <Icon sx={{ fontSize: 22 }} />
        </Box>
        <Typography
          variant="caption"
          sx={{
            color: brand.muted,
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          {kpi.label}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.15 }}>
          {kpi.value}
        </Typography>
        <Typography variant="caption" sx={{ fontWeight: 600, color: trendColor(kpi), mt: 0.25 }}>
          {comparison}
        </Typography>
      </Stack>
    </Paper>
  );
}

export function KpiSummaryCards({ items }: { items: DashboardKpi[] }) {
  return (
    <Grid container spacing={3}>
      {items.map((kpi) => (
        <Grid key={kpi.id} size={{ xs: 12, sm: 6, lg: 3 }}>
          <KpiCard kpi={kpi} />
        </Grid>
      ))}
    </Grid>
  );
}
