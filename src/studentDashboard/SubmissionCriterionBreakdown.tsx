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

            <h2>Score Explanation</h2>

            {/* One block per criterion */}
            {data.criteria.map((criterion) => (
                <div key={criterion.criterion} className="criterion-block">

                    {/* Criterion title and score on the same line */}
                    <div className="criterion-header">
                        <h3>
                            {criterion.titleLabel}: {criterion.score.toFixed(1)}
                        </h3>
                    </div>

                    {/* Score Explanation */}
                    <div className="criterion-scorebar-row">
                        <div className="criterion-subheading">
                            Score Explanation
                        </div>

                        {/* Bar with 0-9 labels */}
                        <div className="score-bar-with-labels">

                            <span className="score-min">0</span>

                            <div className="score-bar">
                                {criterion.scoreBar.map((segment) => (
                                    <div
                                        key={segment.value}
                                        className={`score-segment ${segment.isActive ? "active" : ""
                                            } ${segment.isHalfActive ? "half-active" : ""
                                            }`}
                                    />
                                ))}
                            </div>

                            <span className="score-max">9</span>
                        </div>
                    </div>

                    {/* Explanation text */}
                    <div className="criterion-explanation">
                        {criterion.explanationText}
                    </div>
                </div>
            ))}
        </section>
    );
}