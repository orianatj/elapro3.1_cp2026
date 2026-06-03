
// Import shared PageHeader DTO
import type { PageHeaderViewData } from "../common/PageHeaderDTO";

// Import shared task description DTO used across student pages
import type {TaskDescription} from "./common/TaskDescriptionDTO";
import type { CompetencyType } from "../common/api/results";

/**
 * StudentSubmissionAnalysisViewData
 * 
 * This ViewData model defines the complete UI contract required to
 * render the Student Submission Analysis page.
 */

/* ------------------------------------------------------------------ 
* Main Submission Analysis Interface
* ------------------------------------------------------------------- 
*/ 
// Main page-level ViewData for the Submission Analysis screen
// Acts as the UI contract between the page-level data source and the React components
export interface SubmissionAnalysis {      
    pageHeader: PageHeaderViewData;         // Shared page header (title + breadcrumb)
    submissionMeta: SubmissionMeta;         // Metadata about the submission (e.g. Academic/General, Task 1/2)
    scoreOverview: ScoreOverview;           // Displays overall and criteria scores, as well as writing metrics.
    submissionSummary: SubmissionSummary;   // Contains the task description and the submitted essay response
    criterionBreakdown: CriterionBreakdown; // Detailed breakdown of scores and feedback for each criterion, used in the expandable sections of the UI.
    actions: SubmissionActions;             // Available actions the student can take related to this submission (e.g. download report, request review)
}

/*===================== SubmissionMeta =====================*/
// Metadata about the submission, used to contextualize the analysis and for conditional rendering logic.
export type SubmissionMeta = {
  taskLabel: string;                  // Derived from backend submission data (ieltsType + taskType), e.g. "Academic Task 2"
};


/* ===================== Score Overview ==================== */
// Summary of scoring-related information displayed at the top of the analysis page.
// This section provides a high-level overview of how the submission was scored.
export type ScoreOverview = {
  overallScore: number;               // Overall score for the submission, e.g. 6.5
  overallScoreBar: ScoreBarSegment[]; // Data for rendering the overall score bar visualization  
  criteriaScores: CriterionScore[];   // List of scores for each criterion
  
  submissionDate: string;             // Derived from backend 'timestamp', formatted for display, e.g. "Mar 17, 2026"  
  wordCount: number;                  // Derived from backend 'wordCount'
};

// Represents the score for an individual IELTS assessment criterion
export type CriterionScore = {
  criterion: CriterionType;     // Internal identifier used for mapping logic, e.g. 'task-response'
  displayLabel: string;         // Label shown in the UI, e.g. 'Task Response'
  score: number;                // Band score for this criterion, e.g. 6.0
  scoreBar: ScoreBarSegment[];  // UI-ready data for rendering the criterion score bar visualisation
};

// Supported IELTS marking criteria used across the submission analysis page
export type CriterionType = CompetencyType;


// Represents a single segment within a score bar visualisation.
export type ScoreBarSegment = {
  value: number;     // band value for this segment, e.g. 1 - 9
  isActive: boolean; // whether this segment should be visually highlighted.
};


/* ===================== Submission Summary ===================== */
// Summary of the submitted content displayed, 
// including the original task description and the student's written response
export type SubmissionSummary = {
  taskDescription: TaskDescription;      // Imported shared DTO containing the task question
  submittedResponse: SubmittedResponse;  // Contains the essay text derived from the backend response
};

export type SubmittedResponse = {
  essayText: string;   // derived from backend 'essayResponse'
  wordCount?: number;  // derived from length of 'essayResponse'
};


/* ===================== Criterion Breakdown ===================== */
// Detailed breakdown of scores and feedback for each criterion, used in the expandable sections of the UI.
export type CriterionBreakdown = {  
  criteria: CriterionExplanation[]; // List of detailed breakdowns for each criterion
};

// Detailed explanation block for a single IELTS criterion.
// One instance is rendered per selected criterion.
export type CriterionExplanation = {
  criterion: CriterionType;     // Internal identifier
  titleLabel: string;           // UI label, e.g. "Task Response"
  score: number;                // Criterion band score, e.g. 4.0 
  scoreBar: ScoreBarSegment[];  // Visual band bar for this criterion
  explanationText: string;      // AI-generated criterion explanation
};

/* ===================== Submission Actions ===================== */
// Data structure for actions that students can take related to their submission, e.g. "Download Report", "Request Re-evaluation"
export type SubmissionActions = {
  canDownloadReport: boolean;   // Whether the student can download a PDF report of this submission
  canRequestReview: boolean;    // Whether the student is eligible to request a review for this submission
  canReattempt: boolean;         // Whether the student can reattempt this task for re-evaluation
}