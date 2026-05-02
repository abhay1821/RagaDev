import { Box, Paper, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useId, useMemo } from "react";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { brand } from "../../../app/theme/theme";
import { MOCK_ADMISSIONS_7D } from "../data/mockCharts";

const CHART_HEIGHT = 280;
const TOOLTIP_SURFACE = "#151921";

export function AdmissionsDischargesCard() {
  const gradientId = useId().replace(/:/g, "");

  const data = useMemo(
    () =>
      MOCK_ADMISSIONS_7D.labels.map((label, i) => ({
        label,
        admissions: MOCK_ADMISSIONS_7D.admissions[i]!,
        discharges: MOCK_ADMISSIONS_7D.discharges[i]!,
      })),
    [],
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
      <Stack sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Patient Admissions &amp; Discharges
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", mt: 0.25 }}
        >
          Last 7 days overview
        </Typography>
      </Stack>

      <Box sx={{ width: "100%", height: CHART_HEIGHT }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: 8 }}>
            <defs>
              <linearGradient id={`admitFill-${gradientId}`} x1={0} y1={0} x2={0} y2={1}>
                <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity={0.02} />
              </linearGradient>
            </defs>

            <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />

            <XAxis
              dataKey="label"
              tick={{ fill: brand.muted, fontSize: 11, fontWeight: 600 }}
              tickLine={false}
              axisLine={{ stroke: brand.border }}
              interval={0}
              minTickGap={8}
            />
            <YAxis
              domain={[20, 80]}
              tick={{ fill: brand.muted, fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: brand.border }}
              width={36}
            />

            <Tooltip
              cursor={{ stroke: alpha("#ffffff", 0.12), strokeWidth: 1 }}
              wrapperStyle={{ outline: "none" }}
              contentStyle={{
                backgroundColor: TOOLTIP_SURFACE,
                border: `1px solid ${brand.border}`,
                borderRadius: 8,
                fontSize: 12,
              }}
              labelStyle={{ color: brand.muted, marginBottom: 4 }}
              itemStyle={{ fontWeight: 600 }}
              formatter={(value, name) => [
                String(value ?? ""),
                String(name) === "admissions" ? "Admissions" : "Discharges",
              ]}
            />

            <Area
              type="monotone"
              dataKey="admissions"
              name="Admissions"
              stroke="#38bdf8"
              strokeWidth={2.5}
              fill={`url(#admitFill-${gradientId})`}
              dot={{ r: 4, stroke: "#38bdf8", strokeWidth: 2, fill: "#0c1222" }}
              activeDot={{ r: 5 }}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="discharges"
              name="Discharges"
              stroke="#34d399"
              strokeWidth={2}
              strokeDasharray="6 5"
              dot={{ r: 4, stroke: "#34d399", strokeWidth: 2, fill: "#0c1222" }}
              activeDot={{ r: 5 }}
              isAnimationActive={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </Box>

      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
          gap: 2.5,
          mt: 1.5,
          flexWrap: "wrap",
        }}
      >
        <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 0.75 }}>
          <Box
            sx={{ width: 18, height: 3, borderRadius: 1, bgcolor: "#38bdf8" }}
          />
          <Typography variant="caption" color="text.secondary">
            Admissions
          </Typography>
        </Stack>
        <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 0.75 }}>
          <svg width={22} height={10} aria-hidden>
            <line
              x1={0}
              y1={5}
              x2={22}
              y2={5}
              stroke="#34d399"
              strokeWidth={2}
              strokeDasharray="5 4"
            />
          </svg>
          <Typography variant="caption" color="text.secondary">
            Discharges
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}
