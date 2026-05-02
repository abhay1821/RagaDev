import {
  Avatar,
  Box,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { brand } from "../../../app/theme/theme";
import { formatDobDisplay } from "../formatDob";
import type { PatientRecord } from "../types";
import { patientInitials } from "../types";

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <Stack spacing={0.25}>
      <Typography variant="caption" sx={{ color: brand.muted, letterSpacing: "0.06em" }}>
        {label}
      </Typography>
      <Typography
        variant="body2"
        sx={{ fontWeight: 600, color: "#f4f4f5", wordBreak: "break-word" }}
      >
        {value}
      </Typography>
    </Stack>
  );
}

export function PatientGridView({ patients }: { patients: PatientRecord[] }) {
  return (
    <Grid container spacing={2}>
      {patients.map((p) => (
        <Grid key={p.patientId} size={{ xs: 12, sm: 6, lg: 4 }}>
          <Box
            sx={{
              height: "100%",
              p: 2.25,
              borderRadius: 2,
              border: `1px solid ${brand.border}`,
              bgcolor: "rgba(13,31,23,0.65)",
              backgroundImage:
                "linear-gradient(165deg, rgba(52,211,153,0.06), transparent 45%)",
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              sx={{ mb: 2.5, alignItems: "center" }}
            >
              <Avatar
                variant="rounded"
                sx={{
                  width: 52,
                  height: 52,
                  bgcolor: "rgba(52,211,153,0.15)",
                  color: brand.emerald,
                  fontWeight: 700,
                  borderRadius: 2,
                }}
              >
                {patientInitials(p.fullName)}
              </Avatar>
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }} noWrap>
                  {p.fullName}
                </Typography>
                <Typography variant="caption" sx={{ color: brand.muted }}>
                  {p.patientId}
                </Typography>
              </Box>
            </Stack>

            <Grid container spacing={2} sx={{ mt: 0 }}>
              <Grid size={{ xs: 6 }}>
                <DetailRow label="Mobile number" value={p.mobile} />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <DetailRow label="Date of birth" value={formatDobDisplay(p.dateOfBirth)} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <DetailRow label="Gender" value={p.gender} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <DetailRow label="Email" value={p.email ?? "—"} />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}
