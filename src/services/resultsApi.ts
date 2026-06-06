import { api } from "./client";

export const submissionResult = (id: string) => {
    return api.get(`/results/submission/${id}`);
};

export const reviewResult = (id: string, competencies?: any[]) => {
    const body = competencies !== undefined ? { competencies } : {};
    return api.patch(`/results/submission/${id}/teacher-review`, body);

};

export const results = (params?: Record<string, unknown>) => {
  return api.get("/results", { params })
};

export const requestReview = async (submissionId: string) => {
    const response = await api.post(
    `/results/submission/${submissionId}/grading-request`,
    {
        title: `Review Request for Submission ${submissionId}`,
        body: "The student has requested a review of their submission. Please re-evaluate the submission and provide feedback.",
    }
  );
  return response.data;
};
