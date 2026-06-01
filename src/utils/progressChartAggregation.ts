import type { ProgressChartPoint, ChartMode } from "../types/student/StudentDashboard";


// Define the maximum number of data points the chart should display
const MAX_CHART_POINTS = 12;

type ProgChartProps = {
    series: ProgressChartPoint[];
};


export function calcUniqueSubDates({ series }: ProgChartProps) {

    /* Derive each date from respective point object, remove time component from timestamp, and add to Set to retain only unique date strings
    */
    const uniqueDates = Array.from(new Set(series.map((point) =>
        point.submissionTimestamp.split("T")[0]))
    );

    // Return the number of unique submission dates
    return {
        uniqueDates,
        countUniqueDates: uniqueDates.length
    };
};



export type AggregationLevelProps = {
    series: ProgressChartPoint[];
};

export function determineAggregationLevel({ series }: AggregationLevelProps) {

    const uniqueDateCount = calcUniqueSubDates({ series }).countUniqueDates;

    const totalSubmissionCount = series.length;


    if (totalSubmissionCount === 0) {
        return "empty";
    }

    // Return raw data if number of submissions is less than or equal to max chart points to preserve readability 
    if (totalSubmissionCount <= MAX_CHART_POINTS) {
        return "raw";
    }

    if (uniqueDateCount <= MAX_CHART_POINTS) {
        return "daily";
    }

    if (uniqueDateCount / 7 <= MAX_CHART_POINTS) {
        return "weekly";
    }

    if (uniqueDateCount / 30 <= MAX_CHART_POINTS) {
        return "monthly";
    }

    return "quarterly";
};


// Define props for getBucketKey
type BucketKeyProps = {
    point: ProgressChartPoint;
    aggregationLevel: string;
};


// Return a bucket key for an individual data point based on aggregation level
export function getBucketKey({ point, aggregationLevel }: BucketKeyProps) {

    if (aggregationLevel === "daily") {

        return point.submissionTimestamp.split("T")[0];

    };

    if (aggregationLevel === "weekly") {

        const date = new Date(point.submissionTimestamp);

        const weekday = date.getDay();

        const daysBacktoMonday = weekday === 0 ? 6 : weekday - 1;

        date.setDate(date.getDate() - daysBacktoMonday);

        return date.toISOString().split("T")[0]
    };

    if (aggregationLevel === "monthly") {

        const date = new Date(point.submissionTimestamp);

        const month = String(date.getMonth() + 1).padStart(2, "0");

        const year = date.getFullYear();

        return `${year}-${month}`;
    };

    if (aggregationLevel === "quarterly") {

        const date = new Date(point.submissionTimestamp);

        const quarter = Math.floor(date.getMonth() / 3) + 1;

        const year = date.getFullYear();

        return `${year}-Q${quarter}`;


    };

    return "";
}


// Transform date label
export function createLabel(bucketKey: string, aggLevel: string) {

    const date = new Date(bucketKey)
    const day = date.getDate();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const quarter = Math.floor(date.getMonth() / 3) + 1;
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const monthName = months[date.getMonth()];
    const hours = date.getHours();
    const minutes = date.getMinutes();


    if (aggLevel === "raw") {

        return `${day}-${month} ${hours}:${minutes}`;

    }


    if (aggLevel === "daily") {

        return `${day}-${month}-${year}`;

    }

    if (aggLevel === "weekly") {

        return `WC ${day}-${month}-${year}`;

    }

    if (aggLevel === "monthly") {

        return `${monthName}-${year}`;

    }

    if (aggLevel === "quarterly") {

        return `Q${quarter}-${year}`;

    }

    return "";
};

export type RawProgressProps = {
    series: ProgressChartPoint[];
    chartMode: ChartMode;
};


export function formatRawProgressSeries({ series, chartMode }: RawProgressProps) {

    const rawChartData = [];

    for (const point of series) {


        const rawChartPoint = {
            dateLabel: createLabel(point.submissionTimestamp, chartMode),
            totalSubmissions: 1,
            meanOverallScore: point.overallScore,
            meanTaskResponse: point.taskResponse,
            meanCoherenceCohesion: point.coherenceCohesion,
            meanLexicalResource: point.lexicalResource,
            meanGrammaticalRangeAccuracy: point.grammaticalRangeAccuracy

        }

        rawChartData.push(rawChartPoint);

    }

    return rawChartData;

};

export type AggProgressProps = {
    series: ProgressChartPoint[];
    aggregationLevel: string;
};

// Transform chart data to aggregated form 
export function aggregateProgressSeries({ series, aggregationLevel }: AggProgressProps) {

    // Define Map Object to store unique bucket keys and corresponding chart points
    const groupedBuckets = new Map<string, ProgressChartPoint[]>();

    for (const point of series) {

        const bucketKey = getBucketKey({ point, aggregationLevel })

        // If the bucketKey doesn't exist, add it and assign an empty array
        if (!groupedBuckets.has(bucketKey)) {

            groupedBuckets.set(bucketKey, []);
        }

        // Append the point object to the corresponding element array
        groupedBuckets.get(bucketKey)?.push(point);
    };


    // Perform aggregation by bucket key groups

    const aggregatedChartData = [];


    for (const [bucketKey, points] of groupedBuckets) {


        let totalOverallScore = 0;
        let totalTaskResponse = 0;
        let totalCoheranceCohesion = 0;
        let totalLexicalResource = 0;
        let totalGrammaticalRangeAccuracy = 0;
        let totalSubmissions = points.length;


        for (const point of points) {

            totalOverallScore += point.overallScore;
            totalTaskResponse += point.taskResponse;
            totalCoheranceCohesion += point.coherenceCohesion;
            totalLexicalResource += point.lexicalResource;
            totalGrammaticalRangeAccuracy += point.grammaticalRangeAccuracy;

        }


        // Calculate category mean to 2dp
        function calcMean(categoryTotal: number, subCount: number) {

            return (

                Number((categoryTotal / subCount).toFixed(1))
            )
        };


        const aggChartPoint = {
            dateLabel: createLabel(bucketKey, aggregationLevel),
            totalSubmissions,
            meanOverallScore: calcMean(totalOverallScore, totalSubmissions),
            meanTaskResponse: calcMean(totalTaskResponse, totalSubmissions),
            meanCoherenceCohesion: calcMean(totalCoheranceCohesion, totalSubmissions),
            meanLexicalResource: calcMean(totalLexicalResource, totalSubmissions),
            meanGrammaticalRangeAccuracy: calcMean(totalGrammaticalRangeAccuracy, totalSubmissions),
        }

        aggregatedChartData.push(aggChartPoint);

    }


    return aggregatedChartData;

};




