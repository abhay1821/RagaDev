import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { brand } from "../../../app/theme/theme";
import type { ProviderBookedSlot, ProviderUtilizationCard, ProviderUtilizationSummary } from "../types";

function ClinicAverageDonut({ percent }: { percent: number }) {
  const size = 44;
  const stroke = 4;
  const r = (size - stroke) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const dashOffset = circumference - (Math.min(100, percent) / 100) * circumference;

  return (
    <Box sx={{ flexShrink: 0 }} aria-hidden>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={stroke}
        />
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={brand.emerald}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          transform={`rotate(-90 ${cx} ${cy})`}
        />
      </svg>
    </Box>
  );
}

function UtilizationBar({ pct }: { pct: number }) {
  const widthPct = Math.min(100, Math.max(0, pct));
  return (
    <Box
      sx={{
        mt: 1,
        height: 8,
        borderRadius: 1,
        bgcolor: alpha("#ffffff", 0.08),
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          height: "100%",
          width: `${widthPct}%`,
          borderRadius: 1,
          bgcolor: brand.emerald,
          boxShadow: `0 0 12px ${alpha(brand.emerald, 0.35)}`,
          transition: "width 0.35s ease",
        }}
      />
    </Box>
  );
}

function BookedSlotRow({ slot }: { slot: ProviderBookedSlot }) {
  return (
    <Box
      sx={{
        py: 1.25,
        borderBottom: `1px solid ${brand.border}`,
        "&:last-of-type": { borderBottom: "none", pb: 0 },
      }}
    >
      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 0.5 }}>
            <AccessTimeRoundedIcon sx={{ fontSize: 16, color: brand.muted }} />
            <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary" }}>
              {slot.time}
            </Typography>
          </Stack>
          <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 0.5 }}>
            <CalendarMonthRoundedIcon sx={{ fontSize: 16, color: brand.muted }} />
            <Typography variant="body2" color="text.secondary">
              {slot.date}
            </Typography>
          </Stack>
        </Stack>
        <Box
          component="span"
          sx={{
            flexShrink: 0,
            px: 0.85,
            py: 0.35,
            borderRadius: 1,
            bgcolor: "#2563eb",
            color: "#fff",
            fontSize: "0.65rem",
            fontWeight: 800,
            letterSpacing: "0.04em",
            lineHeight: 1,
          }}
        >
          {slot.visitCode}
        </Box>
      </Stack>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75, pl: 0.25 }}>
        {slot.patientName}
      </Typography>
    </Box>
  );
}

function ProviderCard({ provider }: { provider: ProviderUtilizationCard }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 2.25 },
        borderRadius: 2,
        border: `1px solid ${brand.border}`,
        bgcolor: "rgba(21,25,33,0.55)",
        height: "100%",
      }}
    >
      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
        {provider.name}
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.25 }}>
        {provider.specialty}
      </Typography>
      <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 0.5, mt: 1 }}>
        <LocationOnOutlinedIcon sx={{ fontSize: 16, color: brand.muted }} />
        <Typography variant="caption" color="text.secondary">
          {provider.location}
        </Typography>
      </Stack>

      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "baseline",
          mt: 2,
        }}
      >
        <Typography variant="caption" sx={{ fontWeight: 600, color: brand.muted }}>
          Utilization
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: brand.emerald }}>
          {provider.utilizationPct}%
        </Typography>
      </Stack>
      <UtilizationBar pct={provider.utilizationPct} />
      <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.75 }}>
        {provider.bookedSlots} of {provider.totalSlots} slots booked
      </Typography>

      <Typography
        variant="caption"
        sx={{
          display: "block",
          mt: 2,
          mb: 0.5,
          fontWeight: 700,
          color: alpha("#fafafa", 0.85),
          letterSpacing: "0.02em",
        }}
      >
        Booked Slots:
      </Typography>
      <Box>
        {provider.slots.map((slot) => (
          <BookedSlotRow key={slot.id} slot={slot} />
        ))}
      </Box>
    </Paper>
  );
}

export function ProviderUtilizationSection({ data }: { data: ProviderUtilizationSummary }) {
  const pct = data.clinicAveragePct;

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 2.5 },
        borderRadius: 2,
        border: `1px solid ${brand.border}`,
        bgcolor: "rgba(21,25,33,0.55)",
        mb: 4,
      }}
    >
      <Stack
        sx={{
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "flex-start", sm: "center" },
          justifyContent: "space-between",
          gap: 2,
          mb: 3,
        }}
      >
        <Stack sx={{ flexDirection: "row", gap: 1.75, alignItems: "flex-start" }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: alpha("#38bdf8", 0.12),
              border: `1px solid ${alpha("#38bdf8", 0.25)}`,
              color: "#7dd3fc",
              flexShrink: 0,
            }}
          >
            <GroupsOutlinedIcon sx={{ fontSize: 26 }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.25 }}>
              Provider Utilization
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Clinic-wide capacity overview
            </Typography>
          </Box>
        </Stack>

        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
            gap: 1.5,
            alignSelf: { xs: "stretch", sm: "auto" },
          }}
        >
          <Box sx={{ textAlign: { xs: "left", sm: "right" }, flex: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Clinic Average
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, color: brand.emerald, lineHeight: 1.1 }}>
              {pct}%
            </Typography>
          </Box>
          <ClinicAverageDonut percent={pct} />
        </Stack>
      </Stack>

      <Grid container spacing={2.5}>
        {data.providers.map((provider) => (
          <Grid key={provider.id} size={{ xs: 12, md: 4 }}>
            <ProviderCard provider={provider} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}
