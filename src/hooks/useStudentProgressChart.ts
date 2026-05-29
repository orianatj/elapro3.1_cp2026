import { useQuery } from "@tanstack/react-query";
import { studentProgressTracking as StudentProgressTrackingApi } from "../services/dashboardApi";
import type { StudentProgressTracking } from "../types/common/StudentDashboard";
import { determineAggregationLevel, aggregateProgressSeries, formatRawProgressSeries } from "../utils/progressChartAggregation";


/* Define TanStack Query, Query hook to return progress chart data for the user's dashboard. 
TODO: Subscribe uwith query key to new submission marked notification endpoint using InvalidateQueries functionality inside that mutation
*/
export function useStudentProgressChart(params: StudentProgressTracking) {
    return useQuery({
        queryKey: ["student-progress-chart", params],
        queryFn: () => StudentProgressTrackingApi(params),
        select: (response) => {

            const series = response.data.series;

            const aggregationLevel = determineAggregationLevel({ series });

            if (aggregationLevel === "empty") {
                return {
                    chartMode: "empty",
                    message:
                        "It looks like you haven't completed any submissions yet."
                };
            }

            if (aggregationLevel === "raw") {

                const chartData = formatRawProgressSeries({ series, chartMode: "raw" });


                return {
                    chartMode: "raw",
                    message: "",
                    aggregationLevel,
                    chartData
                }
            };


            const chartData =
                aggregateProgressSeries({ series, aggregationLevel });

            return {
                chartMode: "aggregated",
                message: "",
                aggregationLevel,
                chartData
            };
        }
    });
}