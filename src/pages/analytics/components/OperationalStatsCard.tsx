import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { StatMiniCard } from "../../../app/components/StatMiniCard";
import { brand } from "../../../app/theme/theme";
import type { EfficiencyScoreBlock, OperationalMetric } from "../types";

export function OperationalStatsCard({
  metrics,
  efficiency,
}: {
  metrics: OperationalMetric[];
  efficiency: EfficiencyScoreBlock;
}) {
  const purple = "#a78bfa";

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 2.5 },
        borderRadius: 2,
        border: `1px solid ${brand.border}`,
        bgcolor: "rgba(21,25,33,0.55)",
        height: "100%",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Operational Stats
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.25, mb: 2 }}>
        Key performance metrics
      </Typography>

      <Grid container spacing={2}>
        {metrics.map((metric) => (
          <Grid key={metric.id} size={{ xs: 12, sm: 6 }}>
            <StatMiniCard
              label={metric.label}
              value={metric.value}
              trendLabel={metric.trendLine}
              trendUp={metric.trendUp}
            />
          </Grid>
        ))}
      </Grid>

      <Box
        sx={{
          mt: 2,
          p: 2,
          borderRadius: 2,
          border: `1px solid ${alpha(purple, 0.35)}`,
          bgcolor: alpha(purple, 0.08),
        }}
      >
        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1.5, minWidth: 0 }}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: 1.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: alpha(purple, 0.18),
                color: purple,
                flexShrink: 0,
              }}
            >
              <ScheduleRoundedIcon sx={{ fontSize: 22 }} />
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ fontWeight: 700, color: purple }}>
                {efficiency.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {efficiency.subtitle}
              </Typography>
            </Box>
          </Stack>
          <Typography variant="h3" sx={{ fontWeight: 700, flexShrink: 0 }}>
            {efficiency.score}
          </Typography>
        </Stack>
      </Box>
    </Paper>
  );
}
