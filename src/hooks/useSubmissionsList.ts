import { useQuery } from "@tanstack/react-query";
import { submissionsList as submissionsListApi } from "../services/submissionsApi";

export function useSubmissionsList(params = {}) {
    return useQuery({
        queryKey: ['submissions', params],
        queryFn: () => submissionsListApi(params)
    });
}