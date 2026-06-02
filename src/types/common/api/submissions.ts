
// Represents a single submission object returned from GET /api/v1/submissions.
export type SubmissionResponse = {
  submissionId: string;
  userId: string;
  questionId: string;

  ieltsType: string;
  taskType: string;

  questionText: string;
  customQuestionText: string | null;

  essayText: string;
  wordCount: number;

  validated: string;
  flagged: boolean;
  status: string;

  submittedAt: string;
  gradingQueued: boolean;
};

// Payload for POST /api/v1/submissions
export type SubmitAnswerPayload = {
  ieltsType: string;        
  taskType: string;  
  essayResponse: string;
  questionId: string; 
  customQuestionText: string;
};