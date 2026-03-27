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



/* ------------------------------------------------------------------ 
* Main Submission Analysis Interface
* ------------------------------------------------------------------- 
*/ 
// Main page-level ViewData for the Submission Analysis screen
// Acts as the UI contract between the ViewModel and the React components
export interface SubmissionAnalysis {
    pageHeader: PageHeader;                // Page title and breadcrumb navigation data
    scoreOverview: ScoreOverview;          // Displays overall and criteria scores, as well as writing metrics.
    submissionSummary: SubmissionSummary;  // Contains the task description and the submitted essay response
    scoreExplanation: ScoreExplanation;    // Detailed explanations for overall and criteria scores, with enhancement suggestions.
};



/* ------------------------------------------------------------------ 
* Page Header
* ------------------------------------------------------------------- 
*/ 
// Page header information displayed at the top of the page,
// including the title and breadcrumb navigation context
export type PageHeader = {
  title: string;             // Page title, e.g. "Submission Analysis"
  breadcrumb: Breadcrumb[];  // Breadcrumb navigation hierarchy
};



/* ------------------------------------------------------------------ 
* Score Overview
* ------------------------------------------------------------------- 
*/ 
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



/* ------------------------------------------------------------------ 
* Submission Summary
* ------------------------------------------------------------------- 
*/ 
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



/* ------------------------------------------------------------------ 
* Score Explanation
* ------------------------------------------------------------------- 
*/ 
// Score explanation section, includes detailed overall, and per-criterion explanations.
export type ScoreExplanation = {
  title: string;                                 // e.g. "Score Explanation"
  overallExplanation: OverallExplanation;        // Aggregated explanation for the overall score, combining feedback across all criteria
  criteriaSelector: CriteriaSelector;            // Data for rendering the criterion toggle controls
  criteriaExplanations: CriterionExplanation[];  // One explanation block per criterion, rendered based on criteriaSelector state
};

// Overall explanation for the submission score.
// Aggregates AI feedback across all criteria into a single narrative explanation.
export type OverallExplanation = {  
  overallScore: number;               // Overall band score, e.g. 4.0
  overallScoreBar: ScoreBarSegment[]; // Visual representation of the overall score
  explanationText: string;            // AI-generated overall explanation (multi-paragraph)
};

// Data used to render the criterion toggle controls.
// Determines which criterion explanations are currently visible.
export type CriteriaSelector = {
  availableCriteria: CriterionToggle[];  // List of all criteria with their toggle state (isSelected)
};

// Represents a single toggle option for an IELTS criterion.
export type CriterionToggle = {
  criterion: CriterionType;  // e.g. "task-response"
  label: string;             // e.g. "Task Response"
  isSelected: boolean;       // Controlled by UI state (ViewModel)
};

// Detailed explanation block for a single IELTS criterion.
// One instance is rendered per selected criterion.
export type CriterionExplanation = {
  criterion: CriterionType;     // Internal identifier
  titleLabel: string;           // UI label, e.g. "Task Response"
  score: number;                // Criterion band score, e.g. 4.0
  scoreBar: ScoreBarSegment[];  // Visual band bar for this criterion
  explanationText: string;      // AI-generated criterion explanation
  enhancementSuggestions: EnhancementSuggestions;  // Extracted examples and AI-generated suggestions for improving this criterion
};

// Enhancement suggestions shown under each criterion explanation.
export type EnhancementSuggestions = {
  fromSubmission: SuggestionItem[];         // Extracted examples from the student's essay
  suggestedEnhancements: SuggestionItem[];  // AI-generated improvement suggestions
};

// Represents a single suggestion entry.
export type SuggestionItem = {
  id: string;    // Stable identifier for rendering lists
  text: string;  // Suggestion or excerpt text
};

