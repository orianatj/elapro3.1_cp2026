/**
 * ViewModel representing the data required to render
 * the Student Dashboard page.
 */

// Type defines an individual criterion and the aggregated score values
// plotted for each time period in the chart
export type LineChartSeries = {
    // Label describing the criterion represented by the chart line
    // e.g. 'Overall Score', 'Task Achievement', 'Lexical Resource'
    scoreLabel: string 

    dataPoints: number[]  // Aggregated score value for each time period
}