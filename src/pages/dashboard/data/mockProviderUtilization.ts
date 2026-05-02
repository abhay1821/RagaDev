import type { ProviderUtilizationSummary } from "../types";

export const MOCK_PROVIDER_UTILIZATION: ProviderUtilizationSummary = {
  clinicAveragePct: 68,
  providers: [
    {
      id: "p1",
      name: "Dr. Ryan L",
      specialty: "Immunology Specialist",
      location: "Denver (Central)",
      utilizationPct: 103,
      bookedSlots: 103,
      totalSlots: 100,
      slots: [
        {
          id: "s1",
          time: "8:00 AM",
          date: "01/24/2026",
          patientName: "Marcus M Lovell",
          visitCode: "FU",
        },
        {
          id: "s2",
          time: "9:30 AM",
          date: "01/24/2026",
          patientName: "Sarah Chen",
          visitCode: "NP",
        },
        {
          id: "s3",
          time: "2:00 PM",
          date: "01/24/2026",
          patientName: "James Ortiz",
          visitCode: "FU",
        },
      ],
    },
    {
      id: "p2",
      name: "Dr. Amira Hassan",
      specialty: "Cardiology",
      location: "Denver (North)",
      utilizationPct: 72,
      bookedSlots: 36,
      totalSlots: 50,
      slots: [
        {
          id: "s4",
          time: "10:00 AM",
          date: "01/24/2026",
          patientName: "Elena Brooks",
          visitCode: "FU",
        },
        {
          id: "s5",
          time: "11:15 AM",
          date: "01/24/2026",
          patientName: "David Ng",
          visitCode: "NP",
        },
      ],
    },
    {
      id: "p3",
      name: "Dr. Mei Wong",
      specialty: "Endocrinology",
      location: "Boulder Clinic",
      utilizationPct: 91,
      bookedSlots: 41,
      totalSlots: 45,
      slots: [
        {
          id: "s6",
          time: "8:30 AM",
          date: "01/24/2026",
          patientName: "Robert Kale",
          visitCode: "FU",
        },
        {
          id: "s7",
          time: "1:45 PM",
          date: "01/24/2026",
          patientName: "Priya Nair",
          visitCode: "FU",
        },
      ],
    },
  ],
};
