// hooks/useBandDistribution.ts

import { useQuery } from "@tanstack/react-query";
import { bandDistribution } from "../services/DashboardBandDistribution";

interface BandBucket {
  band: string | number;
  percentage: number;
}

interface BandDistributionParams {
  fromDate?: string;
  toDate?: string;
  ieltsType?: string;
  taskType?: string;
}

interface BandDistributionResponse {
  bands: BandBucket[];
}

export const useBandDistribution = (
  params?: BandDistributionParams
) => {
  return useQuery<BandDistributionResponse>({
    queryKey: ["band-distribution", params],

    queryFn: async () => {
      const res = await bandDistribution(params);

      const payload = res?.data?.data ?? res?.data ?? {};

      return {
        bands: Array.isArray(payload?.bands)
          ? payload.bands
          : [],
      };
    },

    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};