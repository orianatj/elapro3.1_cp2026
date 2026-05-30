import type { ProgressChartPoint } from "../types/student/StudentDashboard";


// Define props for calcSummaryStats function
export type calcSummaryProps = {
    series: ProgressChartPoint[];
}



/* Function to calculate summary statistics for the Student Dashboard stat cards to display. Staticis to be calculated include: total submissions, highest score, lowest score and average score.
*/

export function calcSummaryStats({ series }: calcSummaryProps) {

    // Calculate total submissions 
    const totalSubmissions = series.length;

    // Get overall score from each submission
    const overallScores = series.map(item => item.overallScore);

    // Calculate the highest overall submission score
    let highestScore = 0;

    // Calculate the lowest overall submission score
    let lowestScore = 0;

    // Calculate the lowest overall submission score
    let averageScore = 0;


    if (totalSubmissions === 0) {

        const StatCardData = {
            totalSubmissions,
            highestScore,
            lowestScore,
            averageScore
        };

        return StatCardData;
    };

    // Calculate the highest overall submission score
    highestScore = Math.max(...overallScores);

    // Calculate the lowest overall submission score
    lowestScore = Math.min(...overallScores);

    // Calculate the mean submisson score
    for (const num of overallScores) {
        averageScore += num;
    };

    const StatCardData = {
        totalSubmissions,
        highestScore,
        lowestScore,
        averageScore: Number((averageScore / totalSubmissions).toFixed(1))
    };

    return StatCardData;

};