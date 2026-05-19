
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getStudentSubmissions } from "../services/StudentSubmissionsService";
import { formatDateTime } from "../utils/dateUtils";
import { mapGradingStatus } from "../utils/gradingStatus";

import { mockSubmissionRows } from "../studentDashboard/submissionTable.mock";

import type { StudentSubmissions } from "../types/student/StudentSubmissionsViewData";

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
        useState<FilterValue<TaskType>>("all");   // Accepted values: "all", "task-one", or "task-two". Default set to "all"

    /* ==================== SERVER STATE ==================== */
    // Loading, error, caching, and refetch behaviour is handled automatically by TanStack Query.
    const { data, isPending, isError, error } = useQuery({
        queryKey: ["studentSubmissions", userId, ieltsType, taskType],

        // Query function responsible for retrieving data from the backend API based on the current user and filter states.
        queryFn: () =>
            getStudentSubmissions({
                userId,
                ieltsType: ieltsType === "all" ? undefined : ieltsType,
                taskType: taskType === "all" ? undefined : taskType,
            }),                

        // Prevents the query from running until a valid userId is available
        enabled: Boolean(userId),

        /* ==================== VIEW DATA TRANSFORMATION ==================== */
        // Transform backend submissions into UI-ready StudentSubmissions ViewData when query data changes.
        select: (submissions): StudentSubmissions => ({
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
                        { value: "task-one", label: "Task 1" },
                        { value: "task-two", label: "Task 2" },
                    ],
                },
            },
            submissionsTable: {
                rows:
                    submissions && submissions.length > 0
                        ? submissions.map((submission) => ({
                            submissionId: submission.id,
                            date: formatDateTime(submission.submittedAt),
                            essayType: submission.essayType,
                            ieltsType: submission.ieltsType,
                            taskType: submission.taskType,
                            score: submission.score ?? null,
                            status: mapGradingStatus(submission?.status),
                        }))
                        : mockSubmissionRows,
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
