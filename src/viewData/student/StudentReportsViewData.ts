/**
 * This ViewData model represents all data required to render
 * the Student Reports page. It defines the UI contract for this screen,
 * including breadcrumb navigation, filter controls, and the table of report rows.
 */


// TODO: Replace with shared Breadcrumb import once team agrees on structure
export type Breadcrumb = {
    label: string;                              // Text displayed for this breadcrumb segment
    href?: string;                              // Optional URL for navigation; if omitted the segment is not clickable
};


/**
 * ViewData for the Student Reports page.
 * Contains metadata for the page title, breadcrumb trail,
 * filter options, and the list of report rows to display.
 */
export type StudentReportsViewData = {
    title: string;                              // Page title, e.g. "Reports"
    breadcrumb: Breadcrumb[];                   // Breadcrumb trail representing navigation hierarchy
    
    filters: {
        ieltsOptions:string[];                  // Dropdown options for IELTS type filter, e.g.: ["Show all", "Academic", "General"]
        selectedIelts:string;                   // Currently selected IELTS type filter option

        taskOptions:string[];                   // Dropdown options for Task type filter, e.g. ["Show all", "Task 1", "Task 2"]
        selectedTask:string;                    // Currently selected Task type filter option
    };

    reports: StudentReportRowViewData[];        // List of rows displayed in the Reports table
};


/**
 * 
 * Represents a single row in the Student Reports table.
 * Each row describes one submission, including its metadata and score,
 * and contains the identifier needed to open the submission analysis page.
 */
export type StudentReportRowViewData = {    
    date: string;                               // Date of the submission, formatted as a string for display, e.g. "23/02/2026"
    essayType: string;                          // Category of the submission, e.g. "Practice" or "Submitted"
    ieltsType: string;                          // IELTS type associated with the submission: "Academic" or "General"
    taskType: number;                           // Task type associated with the submission: 1 or 2
    score: number;                              // Overall score achieved for the submission, e.g. 6.5
    reportId: string;                           // Unique identifier for the report, used for navigation to analysis page 
};

