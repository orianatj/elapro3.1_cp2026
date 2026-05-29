// services/DashboardBandDistribution.ts
import { api } from "./client";

export const bandDistribution = (params?: Record<string, unknown>) => {
  return api.get("/dashboard/band-distribution", { params });
};