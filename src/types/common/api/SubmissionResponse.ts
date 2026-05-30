
// Represents a single submission object returned from the backend API.
// used to transform backend submission data into the format required by the Student Submissions page components.
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