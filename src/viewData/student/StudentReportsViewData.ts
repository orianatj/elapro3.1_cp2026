/**
 * This ViewData model represents all data required to render
 * the Student Reports page. It defines the UI contract for this screen,
 * including breadcrumb navigation, filter controls, and the table of report rows.
 */


// TODO: Replace with shared Breadcrumb import if team agrees on structure
export type Breadcrumb = {
    label: string;   // Text displayed for this breadcrumb segment
    href?: string;   // Optional URL for navigation; if omitted the segment is not clickable
};


// TODO: Consider reusing or replacing student/common/StudentFilter dependant on team agreement
// Define union types for filter options used in the Reports dropdowns
export type IeltsType = "Academic" | "General";
export type TaskType = "1" | "2";
export type All = "All";


// Generic select option shape used by dropdowns (label, value) - can be reused across different filter types
export type SelectOption<T extends string | number> = {
  label: string;   // What the dropdown shows, e.g. "Show all", "Task 1"
  value: T;        // What the ViewModel/logic uses, e.g. "All" or "1"
};


/**
 * ViewData for the Student Reports page.
 * Contains metadata for the page title, breadcrumb trail,
 * filter options, and the list of report rows to display.
 */
export type StudentReportsViewData = {
    title: string;              // Page title, e.g. "Reports"
    breadcrumb: Breadcrumb[];   // Breadcrumb trail representing navigation hierarchy
    
    filters: {
        ieltsOptions: SelectOption<IeltsType | All>[];   // Example: [{ label: "Show all", value: "All" }, { label: "Academic", value: "Academic" }]
        selectedIelts: IeltsType | All;                  // Currently selected IELTS type filter option

        taskOptions: SelectOption<TaskType | All>[];     // Example: [{ label: "Show all", value: "All" }, { label: "Task 1", value: 1 }]
        selectedTask: TaskType | All;                    // Currently selected Task type filter option
    };

    reports: StudentReportRowViewData[];   // List of rows displayed in the Reports table
};


/**
 * Represents a single row in the Student Reports table.
 * Each row describes one submission, including its metadata and score,
 * and contains the identifier needed to open the submission analysis page.
 */
export type StudentReportRowViewData = {
    reportId: string;       // backend: submissionId - unique identifier for this report, used for navigation to the analysis page   
    date: string;           // formatted from submission timestamp, e.g. "2024-05-01 14:30"
    essayType: string;      // derived, not provided by backend - e.g. "Practice" or "Submitted Essay"
    ieltsType: IeltsType;   // from backend 'submissions': "Academic" | "General"
    taskType: TaskType;     // from backend 'submissions': "1" | "2"
    score: number;          // from backend 'results', e.g. 6.5
};



