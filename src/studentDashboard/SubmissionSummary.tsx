import type { SubmissionSummary }
  from "../types/student/StudentSubmissionAnalysisViewData";

type SubmissionSummaryProps = {
  data: SubmissionSummary;
};

export function SubmissionSummarySection({ data }: SubmissionSummaryProps) {
  return (
    <section className="submission-summary-section">
      <h2>Submission Summary</h2>

      <div>
        <h3>Task Description</h3>
        <p>{data.taskDescription.questionText}</p>
      </div>

      <div>
        <h3>Submitted Answer</h3>
        <p>{data.submittedResponse.essayText}</p>
      </div>
    </section>
  );
}