import type { ProgressChartPoint } from "../types/common/Dashboard";


// Define the minimum number of dates required to render the chart 
const MIN_UNIQUE_DATES = 5;

// Define the maximum number of data points the chart should display
const MAX_CHART_POINTS = 12;

type ProgChartProps = {
    series: ProgressChartPoint[];
};


export function calcUniqueSubDates({ series }: ProgChartProps) {

    /* Derive each date from respective point object, remove time component from timestamp, and add to Set to retain only unique date strings
    */
    const uniqueDates = [new Set(series.map((point) =>
        point.submissionTimestamp.split("T")[0]))]

    // Return the number of unique submission dates
    return {
        uniqueDates,
        countUniqueDates: uniqueDates.length
    };
};


/* Return boolean true/false to determine if the chart should render. Minimum of 5 data points/unique submission dates should be available for the chart to render */
export function shouldRenderProgressChart({ series }: ProgChartProps) {
    return calcUniqueSubDates({ series }).countUniqueDates >= MIN_UNIQUE_DATES;
};


export function determineAggregationLevel({ series }: ProgChartProps) {

    // Obtain the number of unique submission dates
    const countUniqueDates = calcUniqueSubDates({ series }).countUniqueDates;

    /* Determine the aggregation level that produces 12 data points based on the number of unique submission dates */
    if (countUniqueDates <= MAX_CHART_POINTS) {
        return "daily";
    }

    if (countUniqueDates / 7 <= 12) {
        return "weekly";
    }

    if (countUniqueDates / 30 <= 12) {
        return "monthly";
    }

    return "quarterly";
};

type AggProgressProps = {
    series: ProgressChartPoint[];
    aggregationLevel: string;
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
            totalGrammaticalRangeAccuracy += point.grammticalRangeAccuracy;

        }

        // Transform date label
        // aggChartPoint.datelabel = function(bucketKey)

        function createLabel(bucketKey: string, aggLevel: string) {

            const date = new Date(bucketKey)
            const day = date.getDate();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const year = date.getFullYear();
            const quarter = Math.floor(date.getMonth() / 3) + 1;
            const months = ["Jan", "Feb", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            const monthName = months[date.getMonth()];


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
            meanLexicalResources: calcMean(totalLexicalResource, totalSubmissions),
            meanGrammaticalRangeAccuracy: calcMean(totalGrammaticalRangeAccuracy, totalSubmissions),
        }

        aggregatedChartData.push(aggChartPoint);

    }


    return aggregatedChartData;

};




