import { api } from "./client";

// Fetches list of questions based on IELTS and task type
export const getRandomQuestion = (
    ieltsType: string, 
    taskType: string
) => {
    return api.get("/api/v1/questions", {
        params: {
            ieltsType,
            taskType
        }
    });
};