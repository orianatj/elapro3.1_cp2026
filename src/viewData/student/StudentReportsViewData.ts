/*
 * StudentReportsViewData
 * 
 * This ViewData model represents all data required to render the Student Reports page,
 * including the header, filters, and the reports table.
 */


/* ------------------------------------------------------------------
 * Shared DTO's
 * ------------------------------------------------------------------
 */
// TODO: Replace with shared Breadcrumb import if team agrees on structure
export type Breadcrumb = {
    label: string;   // Text displayed for this breadcrumb segment
    href?: string;   // Optional URL for navigation; if omitted the segment is not clickable
};


/* ------------------------------------------------------------------
 * Main Student Reports Interface 
 * ------------------------------------------------------------------
 */
// Main page-level ViewData for the Student Reports page.
// Acts as the UI contract between the ViewModel and the React components
export interface StudentReports {
    pageHeader: ReportsPageHeader;  // Page title, e.g. "Reports"
    filters: ReportsFilters;        // Dropdown filter options for the reports table
    reportsTable: ReportsTable;     // List of rows displayed in the Reports table
};


/* ------------------------------------------------------------------
 * Reports Page Header
 * ------------------------------------------------------------------
 */
// Page header information displayed at the top of the page,
// including the title and breadcrumb navigation context
export type ReportsPageHeader = {
  title: string;             // Page title, e.g. "Reports"
  breadcrumb: Breadcrumb[];  // Breadcrumb navigation hierarchy
}


/* ------------------------------------------------------------------
 * Reports Filters
 * ------------------------------------------------------------------
 */
// TODO: Consider reusing or replacing student/common/StudentFilter dependant on team agreement
export type ReportsFilters = {
  ieltsType: FilterSelect<IeltsType | ShowAll>;  // IELTS Type dropdown
  taskType: FilterSelect<TaskType | ShowAll>;    // Task Type dropdown
};

// Define union types for filter options used in the Reports dropdowns
export type IeltsType = "academic" | "general";  
export type TaskType = "task1" | "task2";
export type ShowAll = "all";

export type FilterSelect<T extends string> = {
    options: SelectOption<T>[];  // Available options for this filter dropdown
    selected: T;                 // Currently selected value for this filter, e.g. "All" or "Academic"
};

// Generic select option shape used by dropdowns (label, value) - can be reused across different filter types
export type SelectOption<T extends string | number> = {
  label: string;   // What the dropdown shows, e.g. "Show all", "Task 1"
  value: T;        // What the ViewModel/logic uses, e.g. "All" or "1"
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
    ieltsType: IeltsType;   // from backend 'submissions': "Academic" | "General"
    taskType: TaskType;     // from backend 'submissions': "1" | "2"
    score: number;          // from backend 'results', e.g. 6.5
};



