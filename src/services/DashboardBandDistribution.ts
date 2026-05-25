import { api } from "./client";

interface BandDistributionParams {
  fromDate?: string;
  toDate?: string;
  ieltsType?: string;
  taskType?: string;
}

export const bandDistribution = (params?: BandDistributionParams) => {
  return api.get("/dashboard/band-distribution", {
    params,
  });
};