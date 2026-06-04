
import { useMutation } from "@tanstack/react-query";
import { requestReview } from "../services/resultsApi";

// Custom hook to handle the "Request Review" action for a submission..
export const useRequestReview = () => {
  return useMutation({
    mutationFn: (submissionId: string) =>
      requestReview(submissionId),
  });
};
