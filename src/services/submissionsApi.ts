import { api } from "./client";

export const submissionsList = (params = {}) => {
    return api.get("/submissions", { params });
};

export const submissionIndividual = (id: string) => {
    return api.get(`/submissions/${id}`);
};

export const submissionStatus = () => {
    return api.get("/submissions/status");
}