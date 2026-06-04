import type { DisplayStatus } from "../types/common/GradingStatus";
import type { IeltsType, TaskType } from "../types/student/common/StudentFilter";
import type { CriterionType } from "../types/student/StudentSubmissionAnalysisViewData";


// Maps grading status values to user-friendly labels for display in UI
export function getStatusClass(status: DisplayStatus): string {
    switch (status) {
        case "Review Pending":
        case "Pending":    
            return "pending";
        case "AI Graded":
            return "ai_graded";
        case "Teacher Reviewed":
            return "teacher_reviewed";
        case "Teacher Validated":
            return "teacher_validated";
        case "Failed":
            return "failed";    
        case "Processing":
            return "processing";
        default:
            return "status-unknown";
    }
}

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