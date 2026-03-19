/**
 * This view data represents the data required to render
 * the Student Dashboard page. It is comprised of data type objects defined in this file.
 */

export type StudentDashboardViewData = {
    statsOverview:SummaryStats;
    statCards:SummaryCard[];
    chart: ProgressTrackingChart;
    chartFilters: {
        ieltsType:DashboardFilter<IeltsType>;
        taskType:DashboardFilter<TaskType>;
        viewBy:DashboardFilter<ViewBy>;
    }; 
};


// Type defines an individual criterion and the aggregated score values
// plotted for each time period in the chart
export type LineChartSeries = {
    // Label describing the criterion represented by the chart line
    // e.g. 'Overall Score', 'Task Achievement', 'Lexical Resource'
    scoreLabel: string; 
    dataPoints: number[];  // Aggregated score value for each time period
};

// Type defines data to be shown for time period tooltip produced when hovering over a time period data point in the progress tracking chart
export type TimePeriodPoint = {
    timePeriodLabel: string;
    totalSubmissions: number;
    meanOs: number;
    meanTa: number;
    meanGra: number;
    meanLr: number;
    meanCc: number;
};

// Type defines the four key statistics presented to the student at the top of the dashboard page 
export type SummaryStats = {
    totalSubmissions: number;
    highestScore: number;
    lowestScore: number;
    averageScore: number;
};

// Type defines the structure of a summary score card 
export type SummaryCard = {
    cardLabel: string;  //'Total Submissions', 'Highest Score', etc.
    // Any of the properties listed in SummaryStats
    value: number;
};


// Define union types for dashboard filters
export type IeltsType = "Academic" | "General";
export type TaskType = "Task 1" | "Task 2";
export type ViewBy = "Weekly" | "Monthly" | "Quarterly";


// Type defines a generic chart filter which can be used for filter types 'IELTS', 'Task' and 'View By' implemented in the hook (ViewModel) 
export type DashboardFilter<T> = {
  label: string;  // ex. "Choose an IELTS Type"
  selected: T;  // ex. "Academic"
  options: T[];  // ex. ["Academic", "General"]
};


// Type defines the data required for the entire progress tracking chart
export type ProgressTrackingChart = {
    timeLabels: string[];  // Time period labels for x-axis 
    timeSeries:LineChartSeries[];  // Embedded type 
    toolTip:TimePeriodPoint[];  // Embedded type
};