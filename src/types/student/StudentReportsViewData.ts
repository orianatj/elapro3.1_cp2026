// Import shared PageHeader DTO
import type { PageHeaderViewData } from "../common/PageHeaderDTO";

// Import shared StudentFilter DTO from student/common folder. 
import type { 
  StudentFilter,
  FilterValue,
  IeltsType,
  TaskType
} from "./common/StudentFilter";

/*
 * StudentReportsViewData
 * 
 * This ViewData model represents all data required to render the Student Reports page,
 * including the header, filters, and the reports table.
 */

/* ------------------------------------------------------------------
 * Main Student Reports Interface 
 * ------------------------------------------------------------------
 */
// Main page-level ViewData for the Student Reports page.
// Acts as the UI contract between the ViewModel and the React components
export interface StudentReports {
    pageHeader: PageHeaderViewData; // Shared page header (title + breadcrumb)
    filters: ReportsFilters;        // Dropdown filter options for the reports table
    reportsTable: ReportsTable;     // List of rows displayed in the Reports table
}


/* ------------------------------------------------------------------
 * Reports Filters
 * ------------------------------------------------------------------
 */
export type ReportsFilters = {
  ieltsType: StudentFilter<FilterValue<IeltsType>>;  // IELTS Type dropdown
  taskType: StudentFilter<FilterValue<TaskType>>;    // Task Type dropdown
};


/* ------------------------------------------------------------------
 * Reports Table
 * ------------------------------------------------------------------
 */
export type ReportsTable = {
rows: ReportTableRow[];   // List of rows displayed in the Reports table
};

// Represents a single row in the Student Reports table that describes one submission including.
// its metadata, score, and the identifier needed to open the submission analysis page.
export type ReportTableRow = {
    reportId: string;       // backend: submissionId - unique identifier for this report, used for navigation to the analysis page   
    date: string;           // formatted from submission timestamp, e.g. "2024-05-01 14:30"
    essayType: string;      // derived, not provided by backend - e.g. "Practice" or "Submitted Essay"
    ieltsType: IeltsType;   // from backend 'submissions': "academic" | "general"
    taskType: TaskType;     // from backend 'submissions': "task-one" | "task-two"
    score: number;          // from backend 'results', e.g. 6.5
};



