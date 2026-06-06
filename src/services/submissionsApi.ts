import { api } from "./client";

export const submissionsList = (params = {}) => {
    return api.get("/submissions", { params });
};

export const submissionIndividual = (id: string) => {
    return api.get(`/submissions/${id}`);
};

export const createSubmission = (payload: any) => {
    return api.post("/submissions", payload);
};

export const submissionStatus = () => {
    return api.get("/submissions/status");
}

export const uploadFile = (formData: FormData) => {
  return api.post("/submissions/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

