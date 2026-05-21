import { api } from "./client";

export const submissionResult = (id: string) => {
    return api.get(`/results/submission/${id}`);
};