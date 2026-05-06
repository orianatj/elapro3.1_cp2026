import type { ScoreExplanation }
  from "../types/student/StudentSubmissionAnalysisViewData";

type ScoreExplanationProps = {
  data: ScoreExplanation;
};

export function ScoreExplanationSection({ data }: ScoreExplanationProps) {
  return (
    <section className="score-explanation-section">
      <h2>{data.title}</h2>

      <div>Overall Score: {data.overallScore}</div>
      <p>{data.explanationText}</p>
    </section>
  );
}