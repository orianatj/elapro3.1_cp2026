// Response from GET /api/v1/questions
export type QuestionResponse = {
  data: {
    questionId: string;    
    ieltsType: string;
    taskType: string;
    questionText: string;
  };
  meta: {
    mode: string;
    proxied: boolean;
    note: string;
  };
};