import { useQuery } from "@tanstack/react-query";
import { weaknessTrends } from "../services/DashboardWeaknessTrends";
import type {
  WeaknessTrendRow,
  WeaknessTrendsFilters,
} from "../services/DashboardWeaknessTrends";

type ApiRow = {
  week: string;
  task_response: number;
  coherence_cohesion: number;
  lexical: number;
  grammar: number;
};

function normalizeWeaknessTrendData(
  payload: any
): WeaknessTrendRow[] {
  console.log("Weakness Trends API Response:", payload);

  // handle multiple possible backend structures
  const series: ApiRow[] =
    payload?.series ??
    payload?.data?.series ??
    [];

  return series.map((row) => ({
    label: row.week,
    taskResponse: Number(row.task_response ?? 0),
    coherenceCohesion: Number(
      row.coherence_cohesion ?? 0
    ),
    lexicalResource: Number(row.lexical ?? 0),
    rangeAccuracy: Number(row.grammar ?? 0),
  }));
}

export function useWeaknessTrends(
  params: WeaknessTrendsFilters
) {
  return useQuery({
    queryKey: ["weakness-trends", params],

    queryFn: async () => {
      const response = await weaknessTrends(params);

      console.log("Axios Full Response:", response);

      return normalizeWeaknessTrendData(response.data);
    },
  });
}