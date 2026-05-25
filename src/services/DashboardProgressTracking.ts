import { api } from "./client";

type ProgressParams = {
  userId?: string;
  fromDate?: string;
  toDate?: string;
  ieltsType?: "academic" | "general";
  taskType?: "task1" | "task2";
};

export const progressTracking = (
  params?: ProgressParams
) => {
  return api.get(
    "/dashboard/progress-tracking",
    {
      params,
    }
  );
};