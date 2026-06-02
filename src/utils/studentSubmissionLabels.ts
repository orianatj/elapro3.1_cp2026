import { GradingStatus } from "../types/common/GradingStatus";
import type { IeltsType, TaskType } from "../types/student/common/StudentFilter";
import type { CriterionType } from "../types/student/StudentSubmissionAnalysisViewData";


// Maps grading status values to user-friendly labels for display in UI
export const gradingStatusLabels: Record<GradingStatus | "unknown", string> = {
    pending: "Pending",
    processing: "Processing",
    ai_graded: "AI Graded",
    failed: "Error",
    teacher_validated: "Validated",
    teacher_reviewed: "Reviewed",
    unknown: "Unknown",
} as const;

// Maps IELTS type values to user-friendly labels for display in UI
export const ieltsTypeLabels: Record<IeltsType, string> = {
    academic: "Academic",
    general: "General",
};

// Maps Task type values to user-friendly labels for display in UI
export const taskTypeLabels: Record<TaskType, string> = {
    "task1": "Task 1",
    "task2": "Task 2",
};

// Maps CriterionType values to user-friendly labels for display in UI
export const criterionLabels: Record<CriterionType, string> = {
    "task_response": "Task Response",
    "coherence_cohesion": "Coherence and Cohesion",
    "lexical": "Lexical Resource",
    "grammar": "Grammatical Range and Accuracy",
    "overall": "Overall",
};