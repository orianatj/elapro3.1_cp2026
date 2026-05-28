import { api } from "./client";

export const submissionResult = (id: string) => {
    return api.get(`/results/submission/${id}`);
};

export const reviewResult = (id: string, competencies?: any[]) => {
    const body = competencies !== undefined ? { competencies } : {};
    return api.patch(`/results/submission/${id}/teacher-review`, body);
};