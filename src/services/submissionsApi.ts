import { api } from "./client";

export const submissionsList = () => {
    return api.get("/submissions");
};