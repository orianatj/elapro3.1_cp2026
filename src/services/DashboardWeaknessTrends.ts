import { api } from "./client";

export type WeaknessTrendsFilters = {
  fromDate?: string | null;
  toDate?: string | null;
  ieltsType?: "academic" | "general" | null;
  taskType?: "task1" | "task2" | null;
};

export type WeaknessTrendRow = {
  label: string;
  taskResponse: number;
  coherenceCohesion: number;
  lexicalResource: number;
  rangeAccuracy: number;
};

export const weaknessTrends = (
  params: WeaknessTrendsFilters = {}
) => {
  return api.get("/dashboard/weakness-trends", {
    params,
  });
};