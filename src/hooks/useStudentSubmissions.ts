
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { submissionsList } from "../services/submissionsApi";
import { results } from "../services/resultsApi";

import { formatDateTime } from "../utils/dateUtils";
import { mapGradingStatus, getDisplayStatus } from "../utils/gradingStatus";

import type { StudentSubmissions } from "../types/student/StudentSubmissionsViewData";
import type { SubmissionResponse } from "../types/common/api/submissions";
import type { ResultsLightResponse } from "../types/common/api/results";

import type {
    FilterValue,
    IeltsType,
    TaskType,
} from "../types/student/common/StudentFilter";



/**
 * useStudentSubmissions Hook
 *
 * Responsibilities:
 * - Own UI state for the Submissions page
 * - Fetch and transform backend data
 * - Produce StudentSubmissions ViewData for the View layer
 */
export function useStudentSubmissions(userId: string) {

    /* ==================== FILTER STATE ==================== */
    // Functions to update the IELTS and Task filter states.
    // Calling either will trigger a re-render via the queryKey.
    const [ieltsType, setIeltsType] =
        useState<FilterValue<IeltsType>>("all");  // Accepted values: "all", "academic", or "general". Default set to "all"

    const [taskType, setTaskType] =
        useState<FilterValue<TaskType>>("all");   // Accepted values: "all", "task1", or "task2". Default set to "all"

    /* ==================== MAPPING FUNCTION ==================== */
    // Maps the backend 'submissions' data to the StudentSubmissions ViewData format expected by the UI components.
    const mapSubmissionToRow = (
        submission: SubmissionResponse,
        result?: ResultsLightResponse
    ) => {

        // Derives the question type based on whether a custom question text is present.
        const questionType =
            submission.customQuestionText?.trim()
                ? "Custom" : "Generated";

        const safeStatus = mapGradingStatus(result?.status ?? submission.status);

        return {
            submissionId: submission.submissionId,
            date: formatDateTime(submission.submittedAt),
            questionType,

            ieltsType: submission.ieltsType as IeltsType, // Type assertion based on backend API contract
            taskType: submission.taskType as TaskType,    // Type assertion based on backend API contract

            score: result?.overallScore ?? undefined,     // Score from results if available; otherwise undefined until graded
            rawStatus: safeStatus,                       // Safe grading status for UI logic
            displayStatus: getDisplayStatus(safeStatus, !!submission.flagged),
        };
    };

    /* ==================== DATA FETCHING ==================== */
    // Fetches student submissions from the API based on current filter selections.
    const fetchSubmissions = async (): Promise<SubmissionResponse[]> => {
        const response = await submissionsList({
            userId,
            ieltsType: ieltsType === "all" ? undefined : ieltsType,
            taskType: taskType === "all" ? undefined : taskType,
        });

        return response.data.data.items;
    };

    // Fetches grading results for the student to display scores in the table.
    const fetchResults = async (): Promise<ResultsLightResponse[]> => {
        const response = await results({
            userId,
        });

        return response.data.data.items;
    };


    /* ==================== SERVER STATE ==================== */
    // Loading, error, caching, and refetch behaviour is handled automatically by TanStack Query.
    const { data, isPending, isError, error } =
        useQuery<
            {
                submissions: SubmissionResponse[];
                results: ResultsLightResponse[];
            },
            Error,
            StudentSubmissions
        >({
            queryKey: ["studentSubmissions", userId, ieltsType, taskType],

            // Query function responsible for retrieving data from the backend API based on the current user and filter states.
            queryFn: async () => {
                const [submissions, results] = await Promise.all([
                    fetchSubmissions(),
                    fetchResults(),
                ]);

                return { submissions, results };
            },
            // Prevents the query from running until a valid userId is available
            enabled: Boolean(userId),

            /* ==================== VIEW DATA TRANSFORMATION ==================== */
            // Transform backend submissions into UI-ready StudentSubmissions ViewData when query data changes.
            select: ({ submissions, results }): StudentSubmissions => ({
                pageHeader: {
                    title: "Submissions",
                    breadcrumb: [
                        { label: "Dashboard", link: "/student" },
                        { label: "Submissions" },
                    ],
                },
                // Filter configuration consumed directly by the SubmissionsFilters component
                filters: {
                    ieltsType: {
                        title: "IELTS Type",
                        selected: ieltsType,
                        options: [
                            { value: "all", label: "All" },
                            { value: "academic", label: "Academic" },
                            { value: "general", label: "General" },
                        ],
                    },
                    taskType: {
                        title: "Task Type",
                        selected: taskType,
                        options: [
                            { value: "all", label: "All" },
                            { value: "task1", label: "Task 1" },
                            { value: "task2", label: "Task 2" },
                        ],
                    },
                },
                submissionsTable: {
                    // Joins submissions with their corresponding results (if available) 
                    // to produce the data rows for the SubmissionsTable component.
                    rows: (submissions ?? []).map((submission) => {
                        const result = results.find(
                            (r) => r.submissionId === submission.submissionId
                        );

                        return mapSubmissionToRow(submission, result);
                    }),

                },
            }),
        });


    /* ==================== PUBLIC API ==================== */
    // Exposes view data, query state, and filter actions to the page component.
    return {
        viewData: data,
        isPending,
        isError,
        error,
        actions: {
            setIeltsType,
            setTaskType,
        },
    };
}
