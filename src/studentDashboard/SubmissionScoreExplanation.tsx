// UI contract for overall score explanations
import type { ScoreExplanation }
    from "../types/student/StudentSubmissionAnalysisViewData";

type ScoreExplanationProps = {
    data: ScoreExplanation;
};

// Renders the overall submission score explanation
// Includes the overall score and a detailed explanation of how the score was derived.
export function ScoreExplanationSection({ data }: ScoreExplanationProps) {
    return (
        <section className="score-explanation-section">
            <h2>{data.title}</h2>

            <div>Overall Score: {data.overallScore}</div>
            <p>{data.explanationText}</p>
        </section>
    );
}