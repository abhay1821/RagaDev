import {
  Avatar,
  Box,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { memo } from "react";
import { brand } from "../../../app/theme/theme";
import { formatDobDisplay } from "../formatDob";
import type { PatientRecord } from "../types";
import { patientInitials } from "../types";

const tableContainerSx = {
  borderRadius: 2,
  border: `1px solid ${brand.border}`,
  bgcolor: "rgba(13,31,23,0.55)",
  overflowX: "auto",
} as const;

const headerCellSx = {
  color: brand.muted,
  fontWeight: 700,
  letterSpacing: "0.08em",
  borderColor: brand.border,
} as const;

const tableSx = { minWidth: 640 } as const;

const rowSx = {
  "&:last-child td": { borderBottom: 0 },
  "& td": { borderColor: brand.border, verticalAlign: "middle" },
} as const;

const avatarSx = {
  width: 40,
  height: 40,
  bgcolor: "rgba(52,211,153,0.12)",
  color: brand.emerald,
  fontWeight: 700,
  fontSize: "0.85rem",
  borderRadius: 1.5,
} as const;

const PatientTableRow = memo(function PatientTableRow({ patient: p }: { patient: PatientRecord }) {
  return (
    <TableRow hover sx={rowSx}>
      <TableCell>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <Avatar variant="rounded" sx={avatarSx}>
            {patientInitials(p.fullName)}
          </Avatar>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
              {p.fullName}
            </Typography>
            <Typography variant="caption" sx={{ color: brand.muted, display: "block" }}>
              {p.patientId}
            </Typography>
          </Box>
        </Stack>
      </TableCell>
      <TableCell sx={{ fontWeight: 600 }}>{p.mobile}</TableCell>
      <TableCell sx={{ fontWeight: 600 }}>{formatDobDisplay(p.dateOfBirth)}</TableCell>
      <TableCell sx={{ fontWeight: 600 }}>{p.gender}</TableCell>
      <TableCell sx={{ fontWeight: 600, maxWidth: 220 }}>
        <Typography variant="body2" noWrap title={p.email ?? undefined}>
          {p.email ?? "—"}
        </Typography>
      </TableCell>
    </TableRow>
  );
});

export const PatientListView = memo(function PatientListView({ patients }: { patients: PatientRecord[] }) {
  return (
    <TableContainer component={Paper} elevation={0} sx={tableContainerSx}>
      <Table size="medium" sx={tableSx}>
        <TableHead>
          <TableRow>
            <TableCell sx={headerCellSx}>PATIENT</TableCell>
            <TableCell sx={headerCellSx}>MOBILE</TableCell>
            <TableCell sx={headerCellSx}>DATE OF BIRTH</TableCell>
            <TableCell sx={headerCellSx}>GENDER</TableCell>
            <TableCell sx={headerCellSx}>EMAIL</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.map((p) => (
            <PatientTableRow key={p.patientId} patient={p} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});
