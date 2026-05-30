import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reviewResult as reviewResultApi } from "../services/resultsApi";
import type { AxiosResponse } from "axios";

type ReviewResultVariables = {
  id: string;
  competencies?: any[];
};

export function useReviewResult() {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<any>, unknown, ReviewResultVariables>({
    mutationFn: ({ id, competencies }) => reviewResultApi(id, competencies),
    onSuccess: (_, variables) => {
      if (variables?.id) {
        queryClient.invalidateQueries({ queryKey: ["submissionResult", variables.id] });
      }
    },
  });
}