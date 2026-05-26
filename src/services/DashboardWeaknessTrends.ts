import { api } from "./client";

export const weaknessTrends = (params?: Record<string, unknown>) => {
  return api.get("/dashboard/weakness-trends", { params });
};