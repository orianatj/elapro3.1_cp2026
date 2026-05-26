import { api } from "./client";

export type SubmissionResultsParams = {
  userId?: string;
  dateRange?: string;
  graderType?: string;
  competencyName?: string;
  scoreMin?: number;
  scoreMax?: number;
  resultFeedback?: boolean;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  limit?: number;
  page?: number;
};

export const getSubmissionResults = async (params?: SubmissionResultsParams) => {
  const res = await api.get("/results/submission", { params });
  return res.data;
};

export const getSubmissionTeacherResults = async (
  params?: SubmissionResultsParams
) => {
  const res = await api.get("/results", { params });

  return res.data;
};