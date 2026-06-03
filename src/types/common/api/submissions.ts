// Payload for POST /api/v1/submissions
export type SubmitAnswerPayload = {
  ieltsType: string;        
  taskType: string;  
  essayResponse: string;
  questionId: string; 
  customQuestionText: string;
};