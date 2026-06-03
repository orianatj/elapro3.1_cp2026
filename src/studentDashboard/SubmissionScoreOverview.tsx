// UI contract for overall and per-criterion score summary
import type { ScoreOverview }
    from "../types/student/StudentSubmissionAnalysisViewData";

type ScoreOverviewProps = {
    data: ScoreOverview;
};

// Renders a summary of the submission's overall and per-criterion scores
export function ScoreOverviewSection({ data }: ScoreOverviewProps) {
    return (
        <section className="score-overview-section">

            <div className="overall-score-summary">

                <div className="overall-score-label">
                    <span>Average Overall Score</span>
                </div>

                <div className="score-bar-with-labels">

                    <span className="score-min">0</span>

                    <div className="overall-score-bar">

                        {data.overallScoreBar.map((segment) => (
                            <div
                                key={segment.value}
                                className={`score-segment ${segment.isActive ? "active" : ""}`}
                            />
                        ))}
                    </div>

                    <span className="score-max">9</span>

                </div>

                <div className="score-value">
                    {data.overallScore}
                </div>

            </div>

            {/* Criterion score grid */}
            <div className="criteria-scores">
                {data.criteriaScores.map(c => (
                    <div key={c.criterion} className="criterion-card">

                        <div className="criterion-label">
                            {c.displayLabel}
                        </div>

                        <div className="score-bar">
                            {c.scoreBar.map((segment) => (
                                <div
                                    key={segment.value}
                                    className={`score-segment ${segment.isActive ? "active" : ""}`}
                                />
                            ))}
                        </div>

                        <div className="criterion-score">
                            {c.score}
                        </div>
                    </div>
                ))}
            </div>

            {/* Score Meta Cards */}
            <div>Submitted: {data.submissionDate}</div>
            <div>Word Count: {data.wordCount}</div>
        </section>
    );
}