// Import React Query hooks for data fetching
import { useQuery } from "@tanstack/react-query";

// Import API services
import { submissionResult } from "../services/resultsApi";
import { submissionIndividual } from "../services/submissionsApi";

// Import the ViewData types used by the Submission Analysis page
import type { CriterionType, SubmissionAnalysis } from "../types/student/StudentSubmissionAnalysisViewData";
import type { SubmissionResponse } from "../types/common/api/submissions";
import type { ResultFullResponse } from "../types/common/api/results";

// Import utilities for formatting and labeling
import { formatDateTime } from "../utils/dateUtils";
import { ieltsTypeLabels, taskTypeLabels } from "../utils/studentSubmissionLabels";


const labels: Record<CriterionType, string> = {
    "task-response": "Task Response",
    "coherence-cohesion": "Coherence and Cohesion",
    "lexical-resource": "Lexical Resource",
    "grammatical-range-accuracy": "Grammatical Range and Accuracy",
};

// useSubmissionAnalysis is a custom hook responsible for fetching and preparing
export function useSubmissionAnalysis(submissionId: string) {

    // Use TanStack Query to fetch and manage submission data.
    const analysisQuery = useQuery({
        queryKey: ["submissionAnalysis", submissionId], // Unique key for caching and refetching

        // Prevent the query from running if submissionId is not provided
        enabled: !!submissionId,

        // Call the API's to fetch submission analysis data
        queryFn: async () => {

            // Retrieve the submission and results data in parallel from the backend.
            const [resultsResp, submissionResp] = await Promise.all([
                submissionResult(submissionId),
                submissionIndividual(submissionId),
            ]);
            
            const result: ResultFullResponse =
                resultsResp.data.data.results[0];

            const submission: SubmissionResponse =
                submissionResp.data.data;

            return {
                result,
                submission
            };

        },

        // Transform the raw API response into the ViewData format expected by the page components
        select: (data): SubmissionAnalysis => {

            const { result, submission } = data;

            return {
                pageHeader: {
                    title: "Submission Analysis",
                    breadcrumb: [
                        { label: "Dashboard", link: "/student" },
                        { label: "Submissions", link: "/student/submissions" },
                        { label: "Analysis" },
                    ],
                },

                submissionMeta: {
                    taskLabel: `Task Type: ${ieltsTypeLabels[result.ieltsType]} 
                ${taskTypeLabels[result.taskType]}`,
                },


                scoreOverview: {
                    overallScore: result.overallScore,
                    overallScoreBar: [],
                    criteriaScores: result.competencies
                        .filter(c => c.competency !== "overall")
                        .map((criterion) => ({
                            criterion: criterion.competency as CriterionType,
                            displayLabel: labels[criterion.competency as CriterionType],
                            score: criterion.score,
                            scoreBar: [],
                        })),
                    submissionDate: formatDateTime(submission.submittedAt),
                    wordCount: submission.wordCount,
                },

                submissionSummary: {
                    taskDescription: {
                        placeHolderText: submission.question.placeHolderText,
                        questionID: submission.question.id,
                        questionText: submission.question.text,
                    },
                    submittedResponse: {
                        essayText: submission.response.essayText,
                    },

                },

                scoreExplanation: {
                    title: "Score Explanation",
                    overallScore: result.overallScore,
                    overallScoreBar: [],
                    explanationText: submission.score.explanation ?? "Explanation unavailable",
                },

                criterionBreakdown: {
                    criteria: submission.score.criteria.map((criterion) => ({
                        criterion: criterion.competency as CriterionType,
                        titleLabel: labels[criterion.competency as CriterionType],
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
            }
        },
    });


    // Return clean API for page consumption
    return {
        viewData: analysisQuery.data,
        isPending: analysisQuery.isPending,
        isError: analysisQuery.isError,
        error: analysisQuery.error,
    };
}

