
import { GradingStatus } from '../types/common/GradingStatus';

// Safe extension of GradingStatus that includes "unknown" for invalid values
export type SafeGradingStatus = GradingStatus | "unknown";

// Maps a string to a SafeGradingStatus, returning "unknown" for invalid values
export function mapGradingStatus(value?: string): SafeGradingStatus {
    switch (value) {
        case GradingStatus.pending:
        case GradingStatus.processing:
        case GradingStatus.ai_graded:
        case GradingStatus.failed:
        case GradingStatus.teacher_validated:
        case GradingStatus.teacher_reviewed:
            return value;

        default:
            return "unknown";
    }
}

// Determines if the score can be shown based on the grading status
export function canShowScore(status: SafeGradingStatus): boolean {
    return (
        status === GradingStatus.ai_graded ||
        status === GradingStatus.teacher_validated ||
        status === GradingStatus.teacher_reviewed
    );
}
