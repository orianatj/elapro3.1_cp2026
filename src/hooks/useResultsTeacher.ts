// src/hooks/useSubmissionTeacher.ts
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { results } from "../services/resultsApi";

export const useSubmissionTeacherResults = (params?: Record<string, unknown>) => {
  return useQuery({
    queryKey: ["submissionTeacherResults", params],
    queryFn: () => results(params),
    placeholderData: keepPreviousData,
  });
};