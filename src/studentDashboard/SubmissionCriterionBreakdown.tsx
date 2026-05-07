// UI contract for per-criterion score explanations 
import type { CriterionBreakdown }
    from "../types/student/StudentSubmissionAnalysisViewData";

type CriterionBreakdownProps = {
    data: CriterionBreakdown;
};

// Renders score explanations for each IELTS criterion 
// (Task Response, Coherence and Cohesion, Lexical Resource, Grammatical Range and Accuracy)
export function CriterionBreakdownSection({ data }: CriterionBreakdownProps) {
    return (
        <section className="criterion-breakdown-section">
            <h2>Criterion Breakdown</h2>
            {/* One block per criterion */}
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