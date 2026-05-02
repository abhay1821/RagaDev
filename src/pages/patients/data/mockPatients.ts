import type { PatientRecord } from "../types";

export const MOCK_PATIENTS: PatientRecord[] = [
  {
    patientId: "MF-00412",
    fullName: "Arjun Mehta",
    mobile: "+91 9845012345",
    dateOfBirth: "1983-03-12",
    gender: "Male",
    email: "arjun.mehta@email.com",
  },
  {
    patientId: "MF-00389",
    fullName: "Priya Sharma",
    mobile: "+91 9822011122",
    dateOfBirth: "1996-07-05",
    gender: "Female",
    email: null,
  },
  {
    patientId: "MF-00461",
    fullName: "Ramesh Iyer",
    mobile: "+91 9445566778",
    dateOfBirth: "1959-01-18",
    gender: "Male",
    email: "r.iyer@example.org",
  },
  {
    patientId: "MF-00290",
    fullName: "Neha Bose",
    mobile: "+91 9452121705",
    dateOfBirth: "1999-02-23",
    gender: "Female",
    email: null,
  },
  {
    patientId: "MF-00523",
    fullName: "Vikram Desai",
    mobile: "+91 9988776655",
    dateOfBirth: "1971-11-30",
    gender: "Male",
    email: "vikram.d@hospital.in",
  },
];
