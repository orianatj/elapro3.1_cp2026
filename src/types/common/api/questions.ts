// Response from GET /api/v1/questions
export type GetQuestionResponse = {
  questionId: string;
  taskId: number;
  questionText: string;
};