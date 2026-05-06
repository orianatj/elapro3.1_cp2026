import type { SubmissionMeta }
  from "../types/student/StudentSubmissionAnalysisViewData";

type SubmissionMetaBarProps = {
  meta: SubmissionMeta;
};

export function SubmissionMetaBar({ meta }: SubmissionMetaBarProps) {
  return (
    <div className="submission-meta-bar">
      <span>{meta.taskLabel}</span>
    </div>
  );
}
