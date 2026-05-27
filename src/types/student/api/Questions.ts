// Response from GET /api/v1/questions
export type GetQuestionResponse = {
  questionId: number;
  taskId: number;
  questionText: string;
};