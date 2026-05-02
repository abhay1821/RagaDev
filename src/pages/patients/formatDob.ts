import dayjs from "dayjs";

export function formatDobDisplay(isoDate: string): string {
  const d = dayjs(isoDate);
  return d.isValid() ? d.format("D MMM, YYYY") : isoDate;
}
