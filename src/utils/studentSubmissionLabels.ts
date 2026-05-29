import { GradingStatus } from "../types/common/GradingStatus";
import type { IeltsType, TaskType } from "../types/student/common/StudentFilter";


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