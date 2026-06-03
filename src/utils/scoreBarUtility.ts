import type { ScoreBarSegment } from "../types/student/StudentSubmissionAnalysisViewData";

export const buildScoreBar = (score?: number): ScoreBarSegment[] => {
    const safeScore = score ?? 0;

    const fullBar = Math.floor(safeScore);
    const hasHalfbar = safeScore % 1 !== 0;

    return Array.from({ length: 9 }, (_, index) => {
        const segmentValue = index + 1;

        return {
            value: segmentValue,
            isActive: segmentValue <= fullBar,
            isHalfActive: hasHalfbar && segmentValue === fullBar + 1
        };
    });
};
