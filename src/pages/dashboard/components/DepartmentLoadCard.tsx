import type { DepartmentLoadData } from "../types";
import { DonutBreakdownCard } from "./DonutBreakdownCard";

export function DepartmentLoadCard({ data }: { data: DepartmentLoadData }) {
  return (
    <DonutBreakdownCard
      title="Department Load"
      subtitle="Bed occupancy by unit"
      centerCaption="occupied"
      data={data}
    />
  );
}
