import { api } from "./client";

export const submissionResult = (id: string) => {
    return api.get(`/results/submission/${id}`);
};

export const results = (params?: Record<string, unknown>) => {
  return api.get("/results", { params });
};