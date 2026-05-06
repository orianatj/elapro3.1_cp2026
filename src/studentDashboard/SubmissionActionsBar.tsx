import type { SubmissionActions }
  from "../types/student/StudentSubmissionAnalysisViewData";

type SubmissionActionsBarProps = {
  actions: SubmissionActions;
};

export function SubmissionActionsBar({ actions }: SubmissionActionsBarProps) {
  return (
    <div className="submission-actions-bar">
      {actions.canReattempt && <button>Reattempt Essay</button>}
      {actions.canDownloadReport && <button>Download Report</button>}
      {actions.canRequestReview && <button>Request Review</button>}
    </div>
  );
}