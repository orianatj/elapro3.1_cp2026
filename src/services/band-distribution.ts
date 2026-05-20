import { api } from "./client";

// Get band distribution data
export const bandDistribution = () => {
    return api.get("/dashboard/band-distribution");
};