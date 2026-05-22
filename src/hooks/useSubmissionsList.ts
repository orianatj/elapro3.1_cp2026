import { useQuery } from "@tanstack/react-query";
import { submissionsList as submissionsListApi } from "../services/submissionsApi";


export function useSubmissionsList() {
    return useQuery({
        queryKey: ['submissions'],
        queryFn: submissionsListApi
    });
}
