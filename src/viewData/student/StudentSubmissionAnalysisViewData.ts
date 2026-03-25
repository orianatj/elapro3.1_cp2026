/**
 * ViewData for Student Submission Analysis page.
 * Uses shared DTOs where appropriate.
 */


// TODO: Replace with shared Breadcrumb import if team agrees on structure
export type Breadcrumb = {
    label: string;   // Text displayed for this breadcrumb segment
    href?: string;   // Optional URL for navigation; if omitted the segment is not clickable
};


import type {TaskDescription} from "./common/TaskDescriptionDTO.ts";


// Define union types
export type IeltsType = "Academic" | "General";
export type TaskType = "1" | "2";
export type All = "All";


// Main Page ViewData
export type StudentSubmissionAnalysisPageViewData = {
    title: string;                               // Page title, e.g. "Submission Analysis"
    breadcrumb: Breadcrumb[];                    // Breadcrumb trail representing navigation hierarchy
    submissionMeta: SubmissionMetaViewData;      // Data for the submission analysis content
    taskDescription: TaskDescription;            // Task description content for the sidebar
    submissionAnswer: SubmissionAnswerViewData;  // Student's essay response and related data
};



// Submission Metadata ViewData - contains all the information needed to display the submission details at the top of the analysis page, 
// as well as the identifiers needed to fetch and display the essay content and task description.
export type SubmissionMetaViewData = {
  submissionId: string;        // Path param {id}
  ieltsType: IeltsType;        // UI domain value
  taskType: TaskType;          // UI domain value
  dateSubmitted: string;       // Derived formatting of timestamp
  writingTime: string;         // Derived (not explicitly provided by backend)
  wordCount: number;           // Derived from essayResponse
};


// Partial import of TaskAnswerDTO content - can be expanded as needed
export type SubmissionAnswerViewData = {
  text: string;                // derived from backend "essayResponse"
  wordCount: number;           // derived from length of "essayResponse"
};



