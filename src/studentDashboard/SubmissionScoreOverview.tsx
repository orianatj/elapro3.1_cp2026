// UI contract for overall and per-criterion score summary
import type { ScoreOverview }
    from "../types/student/StudentSubmissionAnalysisViewData";

type ScoreOverviewProps = {
    data: ScoreOverview;
};

// Renders a summary of the submission's overall and per-criterion (later) scores
export function ScoreOverviewSection({ data }: ScoreOverviewProps) {
    return (
        <section className="score-overview-section">
            <h2>Score Overview</h2>

            <div>Overall Score: {data.overallScore}</div>
            <div>Submitted: {data.submissionDate}</div>
            <div>Duration: {data.writingDuration}</div>
        </section>
    );
}