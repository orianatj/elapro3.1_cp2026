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


// Safe extension of GradingStatus that includes "unknown" for invalid values
export type SafeGradingStatus = GradingStatus | "unknown";    


// UI display labels for submission status, derived from backend status and flags.
export type DisplayStatus =
    "Pending" 
    | "Processing" 
    | "AI Graded" 
    | "Failed" 
    | "Teacher Validated" 
    | "Teacher Reviewed" 
    | "Review Pending" 
    | "Unknown";