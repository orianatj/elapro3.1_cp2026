// Import routing and hook
import { useParams } from "react-router-dom";
import { useSubmissionAnalysis } from "../../hooks/useSubmissionAnalysis";

// Import UI components
import { PageHeaderView } from "../../common/PageHeaderView";
import { QueryStateHandler } from "../../common/QueryStateHandler";
import { SubmissionMetaBar } from "../../studentDashboard/SubmissionMetaBar";
import { ScoreOverviewSection } from "../../studentDashboard/SubmissionScoreOverview";
import { SubmissionSummarySection } from "../../studentDashboard/SubmissionSummary";
import { ScoreExplanationSection } from "../../studentDashboard/SubmissionScoreExplanation";
import { CriterionBreakdownSection } from "../../studentDashboard/SubmissionCriterionBreakdown";
import { SubmissionActionsBar } from "../../studentDashboard/SubmissionActionsBar";

// Import page-specific styles
import './submissionanalysis.css';


// Page entry component for the Student Submissions screen.
export default function SubmissionAnalysisPage() {

  // Extract submissionId from the URL parameters to fetch the correct submission analysis data.
  const { submissionId } = useParams();

  // TODO: REMOVE console.log after testing
  console.log("Submission ID:", submissionId);

  // Use the custom hook to fetch and prepare the ViewData for this page based on the submissionId.
  const { viewData, isPending, isError, error } = useSubmissionAnalysis(submissionId ?? "");

  // Delegate loading, error, and empty state handling to QueryStateHandler
  return (
    <QueryStateHandler
      isPending={isPending}
      isError={isError}
      error={error}
      data={viewData}
      emptyMessage="No report data available."
    >
      {
        // Render the main page content using the structured ViewData provided by the custom hook.
        // Only renders when data is available and there are no loading or error states.
        (data) => (
          <div className="submission-analysis-page">
            <div className="analysis-page-header">
              <PageHeaderView header={data.pageHeader} />
            </div>

            <div className="analysis-page-meta">
              <SubmissionMetaBar meta={data.submissionMeta} />
            </div>

            <div className="analysis-page-score-overview">
              <ScoreOverviewSection data={data.scoreOverview} />
            </div>

            <div className="analysis-page-submission-summary">
              <SubmissionSummarySection data={data.submissionSummary} />
            </div>

            <div className="analysis-page-criterion-breakdown">
              <CriterionBreakdownSection data={data.criterionBreakdown} />
            </div>

            <div className="analysis-page-action-buttons">
              <SubmissionActionsBar actions={data.actions} />
            </div>
          </div>
        )
      }
    </QueryStateHandler>
  );
}


