// Import shared PageHeader DTO
import type { PageHeaderViewData } from "../common/PageHeaderDTO";

// Import shared GradingStatus type and mapping function
import type { SafeGradingStatus } from "../../utils/gradingStatus";

// Import shared StudentFilter DTO from student/common folder. 
import type {
  StudentFilter,
  FilterValue,
  IeltsType,
  TaskType
} from "./common/StudentFilter";

/*
 * StudentSubmissionsViewData
 * 
 * This ViewData model represents all data required to render the Student Submissions page,
 * including the header, filters, and the submissions table.
 */

/* ------------------------------------------------------------------
 * Main Student Submissions Interface 
 * ------------------------------------------------------------------
 */
// Main page-level ViewData for the Student Submissions page.
// Acts as the UI contract between the ViewModel and the React components
export interface StudentSubmissions {
  pageHeader: PageHeaderViewData; // Shared page header (title + breadcrumb)
  filters: SubmissionsFilters;        // Dropdown filter options for the submissions table
  submissionsTable: SubmissionsTable;     // List of rows displayed in the submissions table
}


/* ------------------------------------------------------------------
 * Submissions Filters
 * ------------------------------------------------------------------
 */
export type SubmissionsFilters = {
  ieltsType: StudentFilter<FilterValue<IeltsType>>;  // IELTS Type dropdown
  taskType: StudentFilter<FilterValue<TaskType>>;    // Task Type dropdown
};


/* ------------------------------------------------------------------
 * Submissions Table
 * ------------------------------------------------------------------
 */
export type SubmissionsTable = {
  rows: SubmissionTableRow[];   // List of rows displayed in the Submissions table
};

// Represents a single row in the Student Submissions table that describes one submission including.
// its metadata, score, and the identifier needed to open the submission analysis page.
export type SubmissionTableRow = {
  submissionId: string;       // backend: submissionId - unique identifier for this submission, used for navigation to the analysis page
  date: string;               // formatted from submission timestamp, e.g. "2024-05-01 14:30"
  essaySource: string;          // derived, not provided by backend - e.g. "Practice" or "Submitted Essay"
  ieltsType: IeltsType;       // from backend 'submissions': "academic" | "general"
  taskType: TaskType;         // from backend 'submissions': "task1" | "task2"
  status: SafeGradingStatus;  // safe grading lifecycle status used for UI rendering and behaviour
  score?: number;             // numeric score from backend 'results'; omitted if not yet available
};



