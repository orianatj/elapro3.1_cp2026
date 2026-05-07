import type { SubmissionAnalysis } from "../../types/student/StudentSubmissionAnalysisViewData";

// Import the shared PageHeaderView component
import { PageHeaderView } from "../../common/PageHeaderView";

// Import page-specific child components,
// responsible for rendering distinct sections of the page.
import { SubmissionMetaBar } from "../../studentDashboard/SubmissionMetaBar";
import { ScoreOverviewSection } from "../../studentDashboard/SubmissionScoreOverview";
import { SubmissionSummarySection } from "../../studentDashboard/SubmissionSummary";
import { ScoreExplanationSection } from "../../studentDashboard/SubmissionScoreExplanation";
import { CriterionBreakdownSection } from "../../studentDashboard/SubmissionCriterionBreakdown";
import { SubmissionActionsBar } from "../../studentDashboard/SubmissionActionsBar";

type SubmissionAnalysisProps = {
  viewData: SubmissionAnalysis;
};

// Page entry component for the Student Submissions screen.
export default function SubmissionAnalysisPage({ viewData }: SubmissionAnalysisProps) {
  return (
    <div className="submission-analysis-page">
      <PageHeaderView header={viewData.pageHeader} />

      <SubmissionMetaBar meta={viewData.submissionMeta} />

      <ScoreOverviewSection data={viewData.scoreOverview} />

      <SubmissionSummarySection data={viewData.submissionSummary} />

      <ScoreExplanationSection data={viewData.scoreExplanation} />

      <CriterionBreakdownSection data={viewData.criterionBreakdown} />

      <SubmissionActionsBar actions={viewData.actions} />
    </div>
  );
}