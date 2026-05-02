import { Box, Paper, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { brand } from "../../../app/theme/theme";
import type { ProviderUtilBarRow } from "../data/mockCharts";

export function ProviderUtilizationBarsCard({
  items,
  clinicAvgPct,
}: {
  items: ProviderUtilBarRow[];
  clinicAvgPct?: number;
}) {
  const clinicAvg =
    clinicAvgPct ??
    Math.round(
      items.reduce((sum, r) => sum + r.pct, 0) / Math.max(items.length, 1),
    );

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
        Provider Utilization
      </Typography>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ display: "block", mt: 0.25, mb: 2.5 }}
      >
        Clinic avg: {clinicAvg}%
      </Typography>

      <Stack sx={{ gap: 2, width: "100%" }}>
        {items.map((row) => (
          <Stack
            key={row.id}
            sx={{
              flexDirection: "row",
              alignItems: "center",
              gap: { xs: 1.5, sm: 2 },
              width: "100%",
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                width: { xs: 96, sm: 118 },
                flexShrink: 0,
                fontWeight: 500,
              }}
              noWrap
            >
              {row.name}
            </Typography>
            <Box
              sx={{
                flex: 1,
                height: 10,
                borderRadius: 999,
                bgcolor: alpha("#ffffff", 0.08),
                overflow: "hidden",
                minWidth: 0,
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  width: `${Math.min(row.pct, 100)}%`,
                  borderRadius: 999,
                  bgcolor: row.barColor,
                  boxShadow: `0 0 10px ${alpha(row.barColor, 0.35)}`,
                  transition: "width 0.4s ease",
                }}
              />
            </Box>
            <Typography
              variant="body2"
              sx={{
                width: 44,
                flexShrink: 0,
                textAlign: "right",
                fontWeight: 700,
                color: row.barColor,
              }}
            >
              {row.pct}%
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
}
