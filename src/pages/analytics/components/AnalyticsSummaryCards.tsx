import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import type { SvgIconComponent } from "@mui/icons-material";
import { brand } from "../../../app/theme/theme";
import type { AnalyticsSummaryMetric } from "../types";

const ICONS: Record<string, SvgIconComponent> = {
  patients: PersonRoundedIcon,
  recovered: TaskAltRoundedIcon,
  appointments: CalendarMonthRoundedIcon,
  recovery: AccessTimeRoundedIcon,
};

function TrendPill({ text, up }: { text: string; up: boolean }) {
  const ok = up;
  return (
    <Box
      sx={{
        px: 1,
        py: 0.35,
        borderRadius: 999,
        fontSize: "0.72rem",
        fontWeight: 700,
        bgcolor: ok ? "rgba(52,211,153,0.14)" : "rgba(248,113,113,0.14)",
        color: ok ? "#6ee7b7" : "#fca5a5",
        border: `1px solid ${ok ? "rgba(52,211,153,0.35)" : "rgba(248,113,113,0.35)"}`,
        lineHeight: 1.3,
      }}
    >
      {text}
    </Box>
  );
}

function SummaryCard({ metric }: { metric: AnalyticsSummaryMetric }) {
  const Icon = ICONS[metric.id] ?? PersonRoundedIcon;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.25,
        borderRadius: 2,
        border: `1px solid ${brand.border}`,
        bgcolor: "rgba(21,25,33,0.55)",
        height: "100%",
      }}
    >
      <Stack sx={{ gap: 1.5 }}>
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 1.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: metric.iconBg,
              border: `1px solid ${alpha(metric.iconColor, 0.35)}`,
              color: metric.iconColor,
            }}
          >
            <Icon sx={{ fontSize: 22 }} />
          </Box>
          <TrendPill text={metric.trendBadge} up={metric.trendUp} />
        </Stack>

        <Typography
          variant="caption"
          sx={{
            color: brand.muted,
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          {metric.title}
        </Typography>

        <Typography variant="h4" sx={{ fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.15 }}>
          {metric.value}
        </Typography>

        <Typography variant="caption" sx={{ color: brand.muted, fontWeight: 500 }}>
          {metric.subtext}
        </Typography>
      </Stack>
    </Paper>
  );
}

export function AnalyticsSummaryCards({ items }: { items: AnalyticsSummaryMetric[] }) {
  return (
    <Grid container spacing={3}>
      {items.map((metric) => (
        <Grid key={metric.id} size={{ xs: 12, sm: 6, lg: 3 }}>
          <SummaryCard metric={metric} />
        </Grid>
      ))}
    </Grid>
  );
}
