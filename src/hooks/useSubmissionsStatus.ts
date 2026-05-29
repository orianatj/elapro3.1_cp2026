import { useQuery } from "@tanstack/react-query";
import { submissionStatus as submissionStatusApi } from "../services/submissionsApi";

export function useSubmissionStatus() {
    return useQuery({
        queryKey: ["submission-status"],
        queryFn: submissionStatusApi,
    });
}