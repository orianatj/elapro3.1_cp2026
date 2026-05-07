import type { SubmissionMeta } from "../types/student/StudentSubmissionAnalysisViewData";

// Props for the submission metadata bar component
type SubmissionMetaBarProps = {
    meta: SubmissionMeta;
};

// Displays high-level submission context (eg. "Academic Task 2")
export function SubmissionMetaBar({ meta }: SubmissionMetaBarProps) {
    return (
        <div className="submission-meta-bar">
            {/* UI-ready task label */}
            <span>{meta.taskLabel}</span>
        </div>
    );
}
