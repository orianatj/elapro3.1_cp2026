// UI contract for submission-level actions
import type { SubmissionActions }
    from "../types/student/StudentSubmissionAnalysisViewData";

type SubmissionActionsBarProps = {
    actions: SubmissionActions;
};

// Renders available submission actions based on UI-ready flags
export function SubmissionActionsBar({ actions }: SubmissionActionsBarProps) {
    return (
        <div className="submission-actions-bar">
            {/* Navigate to a new essay attempt */}
            {actions.canReattempt && <button>Reattempt Essay</button>}

            {/* Download submission report */}
            {actions.canDownloadReport && <button>Download Report</button>}

            {/* Request a review of the submission */}
            {actions.canRequestReview && <button>Request Review</button>}
        </div>
    );
}