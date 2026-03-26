/**
 * StudentSubmissionAnalysisViewData
 * 
 * This ViewData model defines the complete UI contract required to
 * render the Student Submission Analysis page.
 */


// TODO: Replace with shared Breadcrumb import if team agrees on a viewData/common shared structure
// Represents a single segment in the breadcrumb navigation trail
export type Breadcrumb = {
    label: string;  // Text displayed for this breadcrumb segment
    href?: string;  // Optional URL for navigation; if omitted the segment is not clickable
};


// Import shared task description DTO used across student pages
import type {TaskDescription} from "./common/TaskDescriptionDTO.ts";


// Main page-level ViewData for the Submission Analysis screen
// Acts as the UI contract between the ViewModel and the React components
export interface SubmissionAnalysis {
    pageHeader: PageHeader;                // Page title and breadcrumb navigation data
    scoreOverview: ScoreOverview;          // Displays overall and criteria scores, as well as writing metrics.
    submissionSummary: SubmissionSummary;  // Contains the task description and the submitted essay response
};


// Page header information displayed at the top of the page,
// including the title and breadcrumb navigation context
export type PageHeader = {
  title: string;             // Page title, e.g. "Submission Analysis"
  breadcrumb: Breadcrumb[];  // Breadcrumb navigation hierarchy
};


// Summary of scoring-related information displayed at the top of the analysis page.
// This section provides a high-level overview of how the submission was scored.
export type ScoreOverview = {
  taskLabel: string;                  // Derived in ViewModel from ieltsType + taskType, e.g. "Academic Task 2"

  overallScore: number;               // Overall score for the submission, e.g. 6.5
  overallScoreBar: ScoreBarSegment[]; // Data for rendering the overall score bar visualization  
  criteriaScores: CriterionScore[];   // List of scores for each criterion
  
  submissionDate: string;             // Derived in ViewModel from backend 'timestamp', formatted for display, e.g. "Mar 17, 2026"  
  writingDuration: string;            // Derived in ViewModel from backend 'submissionDuration', formatted for display, e.g. "45 mins"
};


// Represents the score for an individual IELTS assessment criterion
export type CriterionScore = {
  criterion: CriterionType;     // Internal identifier used for mapping logic, e.g. 'task-response'
  displayLabel: string;         // Label shown in the UI, e.g. 'Task Response'
  score: number;                // Band score for this criterion, e.g. 6.0
  scoreBar: ScoreBarSegment[];  // UI-ready data for rendering the criterion score bar visualisation
};


// Supported IELTS marking criteria used across the submission analysis page
export type CriterionType = (
  | "task-response"
  | "coherence-cohesion"
  | "lexical-resource"
  | "grammatical-range-accuracy"
);


// Represents a single segment within a score bar visualisation.
export type ScoreBarSegment = {
  value: number;     // band value for this segment, e.g. 1 - 9
  isActive: boolean; // whether this segment should be visually highlighted.
};



// Summary of the submitted content displayed, 
// including the original task description and the student's written response
export type SubmissionSummary = {
  taskDescription: TaskDescription;
  submittedResponse: SubmittedResponse;
};


export type SubmittedResponse = {
  essayText: string;  // derived from backend 'essayResponse'
  wordCount?: number;  // derived from length of 'essayResponse'
};
