
import type { GradingStatus } from "../GradingStatus";
import type { IeltsType, TaskType } from "../../student/common/StudentFilter";

// Lightweight model for list/table views returned from /results endpoint.
// Contains only fields required for displaying submission summaries
export type ResultsLightResponse = {
  submissionId: string;
  overallScore?: number;
  status: GradingStatus;
};

// Detailed result model returned from /results/submission/{id}
// Includes full grading data and essay content for analysis view 
export type ResultFullResponse = {
  submissionId: string;
  userId: string;
  taskId: string;

  ieltsType: IeltsType;
  taskType: TaskType;

  overallScore?: number;
  status: GradingStatus;

  questionText: string | null;
  customQuestionText: string | null;

  essayText: string;

  validated: boolean;
  flagged: boolean;

  submittedAt: string;

  competencies: Competency[];
};

export type CompetencyType = 
"overall" 
| "task_response" 
| "coherence_cohesion" 
| "lexical" 
| "grammar";

export type Competency = {
    competency: CompetencyType;
    score: number;
    feedback: string;
    graderType: string;
  };