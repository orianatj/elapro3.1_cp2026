import type { CriterionBreakdown }
  from "../types/student/StudentSubmissionAnalysisViewData";

type CriterionBreakdownProps = {
  data: CriterionBreakdown;
};

export function CriterionBreakdownSection({ data }: CriterionBreakdownProps) {
  return (
    <section className="criterion-breakdown-section">
      <h2>Criterion Breakdown</h2>

      {data.criteria.map((criterion) => (
        <div key={criterion.criterion}>
          <h3>{criterion.titleLabel}</h3>
          <p>Score: {criterion.score}</p>
          <p>{criterion.explanationText}</p>
        </div>
      ))}
    </section>
  );
}