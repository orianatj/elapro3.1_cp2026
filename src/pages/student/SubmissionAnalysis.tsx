import { useParams } from "react-router-dom";
import { useSubmissionAnalysis } from "../../hooks/useSubmissionAnalysis";

import { PageHeaderView } from "../../common/PageHeaderView";
import { QueryStateHandler } from "../../common/QueryStateHandler";
import { SubmissionMetaBar } from "../../studentDashboard/SubmissionMetaBar";
import { ScoreOverviewSection } from "../../studentDashboard/SubmissionScoreOverview";
import { SubmissionSummarySection } from "../../studentDashboard/SubmissionSummary";
import { CriterionBreakdownSection } from "../../studentDashboard/SubmissionCriterionBreakdown";
import { SubmissionActionsBar } from "../../studentDashboard/SubmissionActionsBar";

import "./submissionanalysis.css";

export default function SubmissionAnalysisPage() {
  const { submissionId } = useParams();
  const { viewData, isPending, isError, error } = useSubmissionAnalysis(submissionId ?? "");

return (
  <QueryStateHandler
    isPending={isPending}
    isError={isError}
    error={error}
    data={viewData}
    emptyMessage="No report data available."
  >
    {(data) => (
      <div className="submission-analysis-wrapper">
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
            <SubmissionActionsBar
              actions={data.actions}
              submissionId={submissionId ?? ""}
              reattempt={data.reattempt}
            />
          </div>

        </div>
      </div>
    )}
  </QueryStateHandler>
);
}