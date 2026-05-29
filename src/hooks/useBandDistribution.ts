// hooks/useBandDistribution.ts
import { useQuery } from "@tanstack/react-query";
import { bandDistribution } from "../services/DashboardBandDistribution";

export interface BandBucket {
  band: string | number;
  percentage: number;
}

export const useBandDistribution = (
  params?: Record<string, unknown>
) => {
  return useQuery({
    queryKey: ["band-distribution", params],
    queryFn: async () => {
      const { data } = await bandDistribution(params);

      const payload = data?.data ?? data;
      const bands = payload?.bands ?? [];

      return Array.isArray(bands) ? bands : [];
    },
    staleTime: 1000 * 60 * 5,
  });
};