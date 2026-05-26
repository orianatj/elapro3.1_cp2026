import { api } from "./client";

export type WeaknessTrendsFilters = {
  fromDate?: string | null;
  toDate?: string | null;
  ieltsType?: "academic" | "general" | null;
  taskType?: "task1" | "task2" | null;
};

export const weaknessTrends = (
  params: WeaknessTrendsFilters = {}
) => {
  return api.get(
    "/dashboard/student-progress-tracking",
    {
      params
    }
  );
};