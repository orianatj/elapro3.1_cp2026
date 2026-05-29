import { api } from "./client";

export const submissionsList = (params = {}) => {
    return api.get("/submissions", { params });
};

export const submissionIndividual = (id: string) => {
    return api.get(`/submissions/${id}`);
};

// Create a new submission
export const createSubmission = (payload: any) => {
    return api.post("/api/v1/submissions", payload);
};

export const submissionStatus = () => {
    return api.get("/submissions/status");
}
