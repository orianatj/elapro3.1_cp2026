
import { useQuery } from "@tanstack/react-query";
import { studentProgressTracking as StudentProgressTrackingApi } from "../services/dashboardApi";
import { calcSummaryStats } from "../utils/studentStatCardsAggregation";

export function useStudentProgressSummary() {
    return useQuery({
        queryKey: ["student-progress-stats"],
        queryFn: () => StudentProgressTrackingApi(),
        select: (response) => {

            // Transform and aggregate the series 
            return calcSummaryStats({ series: response.data.series });
        }
    });

};