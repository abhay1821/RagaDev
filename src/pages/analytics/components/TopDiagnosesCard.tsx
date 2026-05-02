import { Grid, Paper, Typography } from "@mui/material";
import { StatMiniCard } from "../../../app/components/StatMiniCard";
import { brand } from "../../../app/theme/theme";
import type { TopDiagnosisItem } from "../types";

export function TopDiagnosesCard({ items }: { items: TopDiagnosisItem[] }) {
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
        Top Diagnoses
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.25, mb: 2 }}>
        Most frequent this month
      </Typography>

      <Grid container spacing={2}>
        {items.map((item) => (
          <Grid key={item.id} size={{ xs: 12, sm: 6 }}>
            <StatMiniCard
              label={item.label}
              value={item.count.toLocaleString()}
              trendLabel={item.trendLabel}
              trendUp={item.trendUp}
            />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}
