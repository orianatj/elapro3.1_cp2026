import { api } from "./client";

export const createQuestion = (
  ieltsType: string,
  taskType: string,
  questionText: string
) => {
  return api.post(
    `/questions?ieltsType=${ieltsType}&taskType=${taskType}&questionText=${questionText}`
  );
};