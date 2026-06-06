import type { IeltsType, TaskType } from "../../student/common/StudentFilter";

// Represents a single submission object returned from GET /api/v1/submissions.
export type SubmissionResponse = {
  submissionId: string;
  userId: string;
  questionId: string;

  ieltsType: IeltsType;
  taskType: TaskType;

  questionText: string;
  customQuestionText: string | null;

  essayText: string;
  wordCount: number;

  validated: boolean;
  flagged: boolean;
  status: string;

  submittedAt: string;
  gradingQueued: boolean;
};

// Payload for POST /api/v1/submissions
export type SubmitAnswerPayload = {
  ieltsType: IeltsType;        
  taskType: TaskType;  
  essayResponse: string;
  questionId: string; 
  customQuestionText: string;
};