import { create } from "zustand";
import { MOCK_PATIENTS } from "../pages/patients/data/mockPatients";
import type { PatientRecord } from "../pages/patients/types";

export type PatientViewMode = "grid" | "list";

function cloneMocks(): PatientRecord[] {
  return MOCK_PATIENTS.map((p) => ({ ...p }));
}

export type PatientRegistryState = {
  patients: PatientRecord[];
  viewMode: PatientViewMode;
};

export type PatientDraft = Omit<PatientRecord, "patientId"> & {
  patientId?: string;
};

type PatientRegistryActions = {
  setViewMode: (mode: PatientViewMode) => void;
  addPatient: (draft: PatientDraft) => void;
};

export type PatientRegistryStore = PatientRegistryState &
  PatientRegistryActions;

export const usePatientStore = create<PatientRegistryStore>((set) => ({
  patients: cloneMocks(),
  viewMode: "grid",
  setViewMode: (viewMode) => set({ viewMode }),
  addPatient: (draft) => {
    const patientId =
      draft.patientId?.trim() ||
      `MF-${crypto.randomUUID().replace(/-/g, "").slice(0, 5).toUpperCase()}`;
    const row: PatientRecord = {
      patientId,
      fullName: draft.fullName,
      mobile: draft.mobile,
      dateOfBirth: draft.dateOfBirth,
      gender: draft.gender,
      email: draft.email ?? null,
    };
    set((s) => ({ patients: [row, ...s.patients] }));
  },
}));
