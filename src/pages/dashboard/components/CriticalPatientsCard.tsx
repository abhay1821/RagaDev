import {
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import type { ReactNode } from "react";
import { brand } from "../../../app/theme/theme";
import type { CriticalPatientRow } from "../types";

const STATUS_COLOR: Record<
  CriticalPatientRow["status"],
  { dot: string; border: string; color: string }
> = {
  Critical: { dot: "#f87171", border: "rgba(248,113,113,0.35)", color: "#fecaca" },
  "Under Review": {
    dot: "#fb923c",
    border: "rgba(251,146,60,0.35)",
    color: "#fdba74",
  },
  Stable: { dot: "#34d399", border: "rgba(52,211,153,0.35)", color: "#a7f3d0" },
  Discharged: {
    dot: "#94a3b8",
    border: "rgba(148,163,184,0.35)",
    color: "#e2e8f0",
  },
};

export function CriticalPatientsCard({
  rows,
}: {
  rows: CriticalPatientRow[];
}) {
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
      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 2,
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Critical Patients
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Requires immediate attention
          </Typography>
        </Box>
        <Button size="small" sx={{ color: brand.emerald }}>
          View all
        </Button>
      </Stack>

      <TableContainerStyled>
        <Table size="small" sx={{ minWidth: 520 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={headSx}>PATIENT</TableCell>
              <TableCell sx={headSx}>DEPARTMENT</TableCell>
              <TableCell sx={headSx}>DR. ASSIGNED</TableCell>
              <TableCell sx={headSx}>STATUS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} hover sx={{ "& td": { borderColor: brand.border } }}>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    {row.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {row.patientRef}
                  </Typography>
                </TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{row.department}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{row.doctor}</TableCell>
                <TableCell>
                  <StatusBadge status={row.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainerStyled>
    </Paper>
  );
}

const headSx = {
  color: brand.muted,
  fontWeight: 700,
  letterSpacing: "0.08em",
  fontSize: "0.65rem",
  borderColor: brand.border,
};

function TableContainerStyled({ children }: { children: ReactNode }) {
  return (
    <Box sx={{ overflowX: "auto", mx: -0.5 }}>
      {children}
    </Box>
  );
}

function StatusBadge({ status }: { status: CriticalPatientRow["status"] }) {
  const cfg = STATUS_COLOR[status];
  return (
    <Chip
      size="small"
      label={
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
          <Box
            sx={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              bgcolor: cfg.dot,
            }}
          />
          <span>{status}</span>
        </Box>
      }
      sx={{
        bgcolor: "transparent",
        border: `1px solid ${cfg.border}`,
        color: cfg.color,
        fontWeight: 600,
      }}
    />
  );
}
