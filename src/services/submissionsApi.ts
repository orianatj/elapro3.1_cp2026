import { api } from "./client";

export const submissionsList = () => {
    return api.get("/submissions");
};

export const submissionIndividual = (id: string) => {
    return api.get(`/submissions/${id}`);
};