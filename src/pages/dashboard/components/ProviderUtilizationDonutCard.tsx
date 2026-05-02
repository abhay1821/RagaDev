import type { DepartmentLoadData } from "../types";
import { DonutBreakdownCard } from "./DonutBreakdownCard";

export function ProviderUtilizationDonutCard({ data }: { data: DepartmentLoadData }) {
  return (
    <DonutBreakdownCard
      title="Provider Utilization"
      subtitle="Clinic capacity by specialty"
      centerCaption="clinic avg"
      data={data}
    />
  );
}
