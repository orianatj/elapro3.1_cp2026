import { useQuery } from "@tanstack/react-query";
import { studentProgressTracking as StudentProgressTrackingApi } from "../services/dashboardApi";
import type { StudentProgressTracking } from "../types/common/Dashboard";


/* Define TanStack Query, Query hook to return progress chart data for the user's dashboard. 
TODO: Subscribe uwith query key to new submission marked notification endpoint using InvalidateQueries functionality inside that mutation
*/
export function useStudentProgressTracking(params: StudentProgressTracking) {
    return useQuery({
        queryKey: ["studentprogress", params],
        queryFn: () => StudentProgressTrackingApi(params)
    });
}