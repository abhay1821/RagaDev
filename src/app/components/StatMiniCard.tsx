import { Paper, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import type { ReactNode } from "react";
import { brand } from "../theme/theme";

function trendColor(up: boolean) {
  return up ? "#6ee7b7" : "#fca5a5";
}

export type StatMiniCardProps = {
  label: string;
  value: ReactNode;
  trendLabel: string;
  trendUp: boolean;
};

export function StatMiniCard({ label, value, trendLabel, trendUp }: StatMiniCardProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 1.75,
        borderRadius: 2,
        border: `1px solid ${brand.border}`,
        bgcolor: alpha("#151921", 0.85),
        height: "100%",
      }}
    >
      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, mb: 0.75 }}>
        {label}
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
        {value}
      </Typography>
      <Typography variant="caption" sx={{ fontWeight: 600, color: trendColor(trendUp) }}>
        {trendLabel}
      </Typography>
    </Paper>
  );
}
