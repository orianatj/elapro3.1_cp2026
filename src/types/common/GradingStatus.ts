// Defines allowed grading status values from backend
export const GradingStatus = {
    pending: "pending",
    processing: "processing",
    ai_graded: "ai_graded",
    failed: "failed",
    teacher_validated: "teacher_validated",
    teacher_reviewed: "teacher_reviewed",
} as const;


// Creates a type from the values above (e.g. "pending" | "processing" | ...)
export type GradingStatus =
    (typeof GradingStatus)[keyof typeof GradingStatus];


