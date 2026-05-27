import { api } from "./client";

export const submissionsList = () => {
    return api.get("/submissions");
};

export const submissionIndividual = (id: string) => {
    return api.get(`/submissions/${id}`);
};

// Create a new submission
export const createSubmission = (payload: any) => {
    return api.post("/api/v1/submissions", payload);
};
