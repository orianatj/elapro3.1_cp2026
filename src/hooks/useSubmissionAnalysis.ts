// Import React Query hooks for data fetching
import { useQuery } from "@tanstack/react-query";

// Import the ViewData type used by the Submission Analysis page
import type { CriterionType, SubmissionAnalysis } from "../types/student/StudentSubmissionAnalysisViewData";

// Import utilities for formatting and labeling
import { formatDateTime } from "../utils/dateUtils";
import { ieltsTypeLabels, taskTypeLabels } from "../utils/studentSubmissionLabels";
import type { IeltsType, TaskType } from "../types/student/common/StudentFilter";

import { mockSubmissionAnalysis } from "../studentDashboard/SubmissionAnalysisMock";

const labels: Record<CriterionType, string> = {
    "task-response": "Task Response",
    "coherence-cohesion": "Coherence and Cohesion",
    "lexical-resource": "Lexical Resource",
    "grammatical-range-accuracy": "Grammatical Range and Accuracy",
};

// useSubmissionAnalysis is a custom hook responsible for fetching and preparing
export function useSubmissionAnalysis(submissionId: string) {

    // Use TanStack Query to fetch and manage submission data.
    const { data, isPending, isError, error } = useQuery({
        queryKey: ["submissionAnalysis", submissionId], // Unique key for caching and refetching

        // Prevent the query from running if submissionId is not provided
        enabled: Boolean(submissionId),

        // Simulate an API call to fetch submission analysis data
        queryFn: async () => {
            // Simulate error handling by throwing an error for certain submissionIds (e.g., "error-case")
            const simulateError = false; // Toggle to true to test error handling 
            if (simulateError) {
                throw {
                    response: { status: 403 },
                };
            }

            // Simulate API response (no backend yet)
            return mockSubmissionAnalysis;

        },

        // transform the raw API response into the ViewData format expected by the page components
        select: (submission): SubmissionAnalysis => ({
            pageHeader: {
                title: "Submission Analysis",
                breadcrumb: [
                    { label: "Dashboard", link: "/student" },
                    { label: "Submissions", link: "/student/submissions" },
                    { label: "Analysis" },
                ],
            },

            submissionMeta: {
                taskLabel: `Task Type: ${ieltsTypeLabels[submission.ieltsType as IeltsType]} ${taskTypeLabels[submission.taskType as TaskType]}`,
            },


            scoreOverview: {
                overallScore: submission.score.overall,
                overallScoreBar: [],
                criteriaScores: submission.score.criteria.map((criterion) => ({
                    criterion: criterion.type as CriterionType,
                    displayLabel: labels[criterion.type as CriterionType],
                    score: criterion.score,
                    scoreBar: [],
                })),
                submissionDate: formatDateTime(submission.submittedAt),
                writingDuration: submission.duration,
            },

            submissionSummary: {
                taskDescription: {
                    placeHolderText: submission.question.placeHolderText,
                    taskID: submission.question.taskID,
                    questionID: submission.question.id,
                    questionText: submission.question.text,
                },
                submittedResponse: {
                    essayText: submission.response.essayText,
                },

            },

            scoreExplanation: {
                title: "Score Explanation",
                overallScore: submission.score.overall,
                overallScoreBar: [],
                explanationText: submission.score.explanation ?? "Explanation unavailable",
            },

            criterionBreakdown: {
                criteria: submission.score.criteria.map((criterion) => ({
                    criterion: criterion.type as CriterionType,
                    titleLabel: labels[criterion.type as CriterionType],
                    score: criterion.score,
                    scoreBar: [],
                    explanationText: criterion.explanation ?? "Explanation unavailable",
                })),

            },

            actions: {
                canDownloadReport: true,
                canRequestReview: true,
                canReattempt: false,
            },
        }),
    });


    // Return clean API for page consumption
    return {
        viewData: data,
        isPending,
        isError,
        error,
    };
}

