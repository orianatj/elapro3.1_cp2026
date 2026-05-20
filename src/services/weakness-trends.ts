import { api } from "./client";

// Get weakness trends data
export const weaknessTrends = () => {
    return api.get("/dashboard/weakness-trends");
};