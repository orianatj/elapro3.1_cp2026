// Payload for POST /api/v1/submissions
export type SubmitAnswerPayload = {
  ieltsType: string;        
  taskType: string;         
  taskId: number;
  essayResponse: string;
  questionId: number;
  customQuestionText: string;
};