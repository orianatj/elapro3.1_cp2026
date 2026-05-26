// services/DashboardBandDistribution.ts
import { api } from "./client";

export interface BandDistributionParams {
  fromDate?: string;
  toDate?: string;
  ieltsType?: string;
  taskType?: string;
}

export const bandDistribution = async (
  params?: BandDistributionParams
) => {
  const response = await api.get("/dashboard/band-distribution", {
    params,
  });

  return response.data;
};