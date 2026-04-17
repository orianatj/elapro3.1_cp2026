import type { StudentFilter,IeltsType, TaskType, ViewBy} from "./common/StudentFilter.ts";


/**
 * This view data represents the data required to render
 * the Student Dashboard page. It is comprised of data type objects defined in this file.
 */

export interface StudentDashboardViewData {
    statsOverview:SummaryStats;
    statCards:SummaryCard[];
    chart: ProgressTrackingChart;
    chartFilters: {
        ieltsType:StudentFilter<IeltsType>;
        taskType:StudentFilter<TaskType>;
        viewBy:StudentFilter<ViewBy>;
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


// Type defines the data required for the entire progress tracking chart
export type ProgressTrackingChart = {
    timeLabels: string[];  // Time period labels for x-axis 
    timeSeries:LineChartSeries[];  // Embedded type 
    toolTip:TimePeriodPoint[];  // Embedded type
};