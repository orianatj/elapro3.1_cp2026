import { useQuery } from "@tanstack/react-query";
import { submissionIndividual as submissionIndividualApi } from "../services/submissionsApi";


export function useSubmissionIndividual(id: string) {
    return useQuery({
        queryKey: ['submissionIndividual', id],
        queryFn: async () => (await submissionIndividualApi(id)).data
    });
}
