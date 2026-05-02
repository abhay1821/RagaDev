import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import { brand } from "../../../app/theme/theme";
import type { DepartmentLoadData } from "../types";

const CHART_SIZE = 220;
const CX = CHART_SIZE / 2;
const CY = CHART_SIZE / 2;
const R = 74;
const STROKE = 26;
const CIRC = 2 * Math.PI * R;

function DonutChart({ segments }: { segments: DepartmentLoadData["segments"] }) {
  return (
    <svg width={CHART_SIZE} height={CHART_SIZE} viewBox={`0 0 ${CHART_SIZE} ${CHART_SIZE}`}>
      <g transform={`rotate(-90 ${CX} ${CY})`}>
        {segments.map((seg, index) => {
          const arcLen = (seg.pct / 100) * CIRC;
          const startArc = segments
            .slice(0, index)
            .reduce((sum, s) => sum + (s.pct / 100) * CIRC, 0);
          return (
            <circle
              key={seg.id}
              cx={CX}
              cy={CY}
              r={R}
              fill="none"
              stroke={seg.color}
              strokeWidth={STROKE}
              strokeDasharray={`${arcLen} ${CIRC}`}
              strokeDashoffset={-startArc}
              strokeLinecap="round"
            />
          );
        })}
      </g>
    </svg>
  );
}

export function DonutBreakdownCard({
  title,
  subtitle,
  centerCaption,
  data,
}: {
  title: string;
  subtitle: string;
  centerCaption: string;
  data: DepartmentLoadData;
}) {
  const { occupiedPct: centerPct, segments } = data;

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
        {title}
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.25, mb: 2 }}>
        {subtitle}
      </Typography>

      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mx: "auto",
          width: CHART_SIZE,
          height: CHART_SIZE,
        }}
      >
        <DonutChart segments={segments} />
        <Stack
          sx={{
            position: "absolute",
            inset: 0,
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: 700, lineHeight: 1 }}>
            {centerPct}%
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.25 }}>
            {centerCaption}
          </Typography>
        </Stack>
      </Box>

      <Stack sx={{ mt: 2 }}>
        {segments.map((seg, index) => (
          <Box key={seg.id}>
            {index > 0 && <Divider sx={{ borderColor: brand.border, my: 1.25 }} />}
            <Stack
              sx={{
                flexDirection: "row",
                alignItems: "center",
                gap: 1.25,
              }}
            >
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  bgcolor: seg.color,
                  flexShrink: 0,
                }}
              />
              <Typography variant="body2" color="text.secondary" sx={{ flex: 1, minWidth: 0 }}>
                {seg.label}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                {seg.count.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ minWidth: 36, textAlign: "right" }}>
                {seg.pct}%
              </Typography>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
}
