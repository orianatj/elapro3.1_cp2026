import { api } from "./client";
import type { StudentProgressTracking } from "../types/common/Dashboard";

// Get progress tracking 

/* Get Student Progress Tracking - populates student dashboard progress tracking chart */
export const studentProgressTracking = async (params: StudentProgressTracking) => {
    const response = await api.get("/dashboard/student-progress-tracking", { params });
    return response.data;
};

// Get Band Distribution

// Get Weakness Trends 