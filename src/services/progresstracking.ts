import { api } from "./client";

// Get progress tracking data
export const progressTracking = () => {
    return api.get("/dashboard/progress-tracking");
};