// Import React Query hooks for data fetching
import { useQuery } from "@tanstack/react-query";

// Import API services
import { submissionResult } from "../services/resultsApi";
import { submissionIndividual } from "../services/submissionsApi";

// Import the ViewData types used by the Submission Analysis page
import type { SubmissionAnalysis } from "../types/student/StudentSubmissionAnalysisViewData";
import type { SubmissionResponse } from "../types/common/api/submissions";
import type { CompetencyType, ResultFullResponse } from "../types/common/api/results";

// Import utilities for formatting and labeling
import { formatDateTime } from "../utils/dateUtils";
import { ieltsTypeLabels, taskTypeLabels, criterionLabels } from "../utils/studentSubmissionLabels";
import { buildScoreBar } from "../utils/scoreBarUtility";

// Defines the display order of IELTS competencies for consistent UI rendering 
const competencyOrder: Record<CompetencyType, number> = {
    overall: 0,
    task_response: 1,
    coherence_cohesion: 2,
    lexical: 3,
    grammar: 4,
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
            const [resultsRes, submissionRes] = await Promise.all([
                submissionResult(submissionId),
                submissionIndividual(submissionId),
            ]);

            const result: ResultFullResponse =
                resultsRes.data.data.results?.[0];
            if (!result) {
                throw new Error("No results data found for this submission.");
            }

            const submission: SubmissionResponse =
                submissionRes.data.data;

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
                        { label: "Submission Analysis" },
                    ],
                },

                submissionMeta: {
                    taskLabel: `Task Type: ${ieltsTypeLabels[result.ieltsType]} ${taskTypeLabels[result.taskType]}`,
                },


                scoreOverview: {
                    overallScore: result.overallScore ?? 0,
                    overallScoreBar: buildScoreBar(result.overallScore),
                    criteriaScores: result.competencies
                        .filter(c => c.competency !== "overall")
                        .sort((a, b) => competencyOrder[a.competency] - competencyOrder[b.competency])
                        .map((criterion) => ({
                            criterion: criterion.competency,
                            displayLabel: criterionLabels[criterion.competency],
                            score: criterion.score,
                            scoreBar: buildScoreBar(criterion.score),
                        })),
                    submissionDate: formatDateTime(submission.submittedAt),
                    wordCount: submission.wordCount,
                },

                submissionSummary: {
                    taskDescription: {
                        placeHolderText: "",
                        questionID: submission.questionId,
                        questionText: result.questionText ?? result.customQuestionText ?? "Task description unavailable",
                    },
                    submittedResponse: {
                        essayText: result.essayText && result.essayText.length > 0
                            ? result.essayText : "Submitted response unavailable",
                    },

                },

                criterionBreakdown: {
                    criteria: result.competencies
                        .filter(c => c.competency)
                        .sort((a, b) => competencyOrder[a.competency] - competencyOrder[b.competency])
                        .map((criterion) => ({
                            criterion: criterion.competency,
                            titleLabel: criterionLabels[criterion.competency],
                            score: criterion.score ?? 0,
                            scoreBar: buildScoreBar(criterion.score),
                            explanationText: criterion.feedback && criterion.feedback.trim().length > 0
                                ? criterion.feedback
                                : "Explanation unavailable",
                        })),

                },

                actions: {
                    canDownloadReport: false,
                    canRequestReview: !submission.flagged, // Only allow review request if one hasn't already been made
                    canReattempt: true,
                },

                reattempt: {
                    ieltsType: submission.ieltsType,
                    taskType: submission.taskType,
                    questionId: submission.questionId,
                }
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

