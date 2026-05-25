import { useQuery } from "@tanstack/react-query";
import { studentProgressTracking as StudentProgressTrackingApi } from "../services/dashboardApi";
import type { StudentProgressTracking } from "../types/common/Dashboard";
import { shouldRenderProgressChart, determineAggregationLevel, aggregateProgressSeries } from "../utils/progressChartAggregation";


/* Define TanStack Query, Query hook to return progress chart data for the user's dashboard. 
TODO: Subscribe uwith query key to new submission marked notification endpoint using InvalidateQueries functionality inside that mutation
*/
export function useStudentProgressChart(params: StudentProgressTracking) {
    return useQuery({
        queryKey: ["student-progress-chart", params],
        queryFn: () => StudentProgressTrackingApi(params),
        select: (response) => {

            const series = response.series;

            const shouldRender = shouldRenderProgressChart(series);

            if (!shouldRender) {

                return {
                    shouldRender,
                    message: "Complete more practice submissions to view progress trends.",
                };
            }

            const aggregationLevel =
                determineAggregationLevel(series);

            const chartData =
                aggregateProgressSeries({ series, aggregationLevel });

            return {
                shouldRender,
                aggregationLevel,
                chartData
            };
        }
    });
}