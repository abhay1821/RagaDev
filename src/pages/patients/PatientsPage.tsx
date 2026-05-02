import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded";
import ViewModuleRoundedIcon from "@mui/icons-material/ViewModuleRounded";
import { Box, Stack, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useState } from "react";
import { useShallow } from "zustand/shallow";
import { AppButton } from "../../app/components/AppButton";
import { brand } from "../../app/theme/theme";
import {
  notifyPatientAddedIfPermitted,
} from "../../lib/pwa/showDemoClinicalNotification";
import {
  usePatientStore,
  type PatientDraft,
  type PatientRegistryStore,
  type PatientViewMode,
} from "../../stores/patientStore";
import { AddPatientDialog } from "./components/AddPatientDialog";
import { PatientGridView } from "./components/PatientGridView";
import { PatientListView } from "./components/PatientListView";

export type { PatientViewMode };

export default function PatientsPage() {
  const { viewMode, setViewMode, patients, addPatient } = usePatientStore(
    useShallow((s: PatientRegistryStore) => ({
      viewMode: s.viewMode,
      setViewMode: s.setViewMode,
      patients: s.patients,
      addPatient: s.addPatient,
    })),
  );
  const [addOpen, setAddOpen] = useState(false);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1400,
        mx: "auto",
        px: { xs: 2, sm: 3 },
        py: { xs: 2, md: 3 },
      }}
    >
      <Stack
        spacing={2}
        sx={{
          mb: 3,
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "stretch", sm: "center" },
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography variant="h5" component="h1" sx={{ fontWeight: 700 }}>
            Patients List
          </Typography>
        </Box>

        <Stack
          direction="row"
          spacing={1.5}
          sx={{
            alignItems: "center",
            alignSelf: { xs: "stretch", sm: "center" },
          }}
        >
          <ToggleButtonGroup
            exclusive
            size="small"
            value={viewMode}
            onChange={(_, next: PatientViewMode | null) => {
              if (next) setViewMode(next);
            }}
            aria-label="patient view mode"
            sx={{
              bgcolor: "rgba(255,255,255,0.04)",
              border: `1px solid ${brand.border}`,
              "& .MuiToggleButton-root": {
                border: "none",
                color: brand.muted,
                "&.Mui-selected": {
                  bgcolor: "rgba(52,211,153,0.18)",
                  color: brand.emerald,
                },
              },
            }}
          >
            <ToggleButton value="grid" aria-label="grid view">
              <ViewModuleRoundedIcon sx={{ mr: 0.75 }} fontSize="small" />
              Grid
            </ToggleButton>
            <ToggleButton value="list" aria-label="list view">
              <ViewListRoundedIcon sx={{ mr: 0.75 }} fontSize="small" />
              List
            </ToggleButton>
          </ToggleButtonGroup>

          <AppButton
            startIcon={<PersonAddOutlinedIcon />}
            onClick={() => setAddOpen(true)}
            sx={{ whiteSpace: "nowrap" }}
          >
            Add Patient
          </AppButton>
        </Stack>
      </Stack>

      {viewMode === "grid" ? (
        <PatientGridView patients={patients} />
      ) : (
        <PatientListView patients={patients} />
      )}

      <AddPatientDialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSubmit={async (draft: PatientDraft) => {
          addPatient(draft);
          await notifyPatientAddedIfPermitted(draft.fullName);
        }}
      />
    </Box>
  );
}
