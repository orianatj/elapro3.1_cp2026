import { useQuery } from "@tanstack/react-query";
import { submissionResult as submissionResultApi } from "../services/resultsApi";


export function useSubmissionResult(id: string) {
    return useQuery({
        queryKey: ['submissionResult', id],
        queryFn: async () => (await submissionResultApi(id)).data
    });
}
