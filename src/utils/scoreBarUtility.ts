import type { ScoreBarSegment } from "../types/student/StudentSubmissionAnalysisViewData";

export const buildScoreBar = (score?: number): ScoreBarSegment[] => {
    const safeScore = score ?? 0;

    return Array.from({ length: 9 }, (_, index) => {
        const segmentValue = index + 1;

        return {
            value: segmentValue,
            isActive: segmentValue <= Math.floor(safeScore),

            // Extend with half scores:
            //isHalfActive: segmentValue === Math.floor(safeScore) + 1 && safeScore % 1 !== 0
        };
    });
};
