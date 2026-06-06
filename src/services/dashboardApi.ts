import { api } from "./client";
import type { StudentProgressTracking } from "../types/student/StudentDashboard";


/* Get Student Progress Tracking - populates student dashboard progress tracking chart */
export const studentProgressTracking = async (params?: StudentProgressTracking) => {

    const cleanParams = Object.fromEntries(
        Object.entries(params ?? {}).filter(
            ([, value]) => value !== "")
    );

    const response = await api.get("/dashboard/student-progress-tracking", { params: cleanParams });

    return response.data;
};
