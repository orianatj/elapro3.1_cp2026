import { api } from "./client";

export const createQuestion = (
  ieltsType: string,
  taskType: string,
  questionText: string
) => {
  return api.post("/api/v1/questions", {
    ieltsType,
    taskType,
    questionText,
  });
};

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