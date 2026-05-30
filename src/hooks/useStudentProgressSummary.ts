/*
import { useQuery } from "@tanstack/react-query";
import { studentProgressTracking as StudentProgressTrackingApi } from "../services/dashboardApi";
import type { StudentProgressTracking } from "../types/common/StudentDashboard";



export function useStudentProgressSummary(params: StudentProgressTracking) {


    return useQuery({
        queryKey: ["student-progress-stats", params],
        queryFn: () => StudentProgressTrackingApi(params),
        select: (response) => {

            const series = response.data.series;
        }
    })

};*/