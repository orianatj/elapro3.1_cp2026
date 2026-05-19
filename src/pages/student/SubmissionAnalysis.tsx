// Import routing and hook
import { useParams } from "react-router-dom";
import { useSubmissionAnalysis } from "../../hooks/useSubmissionAnalysis";

// Import UI components
import { PageHeaderView } from "../../common/PageHeaderView";
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

  // Use the custom hook to fetch and prepare the ViewData for this page based on the submissionId.
  const { viewData, isPending, error } = useSubmissionAnalysis(submissionId ?? "");

  // Explicitly handle loading and error states to ensure the page doesn't attempt to render with incomplete data.
  // Render loading state while student submissions are being fetched
  if (isPending) {
    return <div>
      Loading submissions...
    </div>;
  }

  // Render error state if there was an issue loading submissions
  if (error) {
    return <div>
      Error loading submissions
    </div>;
  }

  // Guard against rendering before ViewData is available
  if (!viewData) {
    return null;
  }

  // Render the submission analysis page using the structured ViewData provided by the custom hook.
  return (
    <div className="submission-analysis-page">
      <div className="section">
        <PageHeaderView header={viewData.pageHeader} />
      </div>

      <div className="section">
        <SubmissionMetaBar meta={viewData.submissionMeta} />
      </div>

      <div className="section">
        <ScoreOverviewSection data={viewData.scoreOverview} />
      </div>

      <div className="section">
        <SubmissionSummarySection data={viewData.submissionSummary} />
      </div>

      <div className="section">
        <ScoreExplanationSection data={viewData.scoreExplanation} />
      </div>

      <div className="section">
        <CriterionBreakdownSection data={viewData.criterionBreakdown} />
      </div>

      <div className="section">
        <SubmissionActionsBar actions={viewData.actions} />
      </div>
    </div>
  );
}