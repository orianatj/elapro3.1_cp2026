
import { GradingStatus } from "../types/common/GradingStatus";

import type { SubmissionTableRow } from "../types/student/StudentSubmissionsViewData";


export const mockSubmissionRows: SubmissionTableRow[] = [
  {
    submissionId: "mock-1",
    date: "01/02/2026",
    questionType: "Practice",
    ieltsType: "academic",
    taskType: "task2",
    score: 7.5,
    rawStatus: GradingStatus.ai_graded,
    displayStatus: "AI Graded",
  },
  {
    submissionId: "mock-2",
    date: "03/02/2026",
    questionType: "Submitted Essay",
    ieltsType: "general",
    taskType: "task1",
    score: 6,
    rawStatus: GradingStatus.processing,
    displayStatus: "Processing",
  },
  {
    submissionId: "mock-3",
    date: "05/02/2026",
    questionType: "Submitted Essay",
    ieltsType: "academic",
    taskType: "task2",
    score: 4.5,
    rawStatus: GradingStatus.pending,
    displayStatus: "Pending",
  },
  {
    submissionId: "mock-4",
    date: "06/02/2026",
    questionType: "Submitted Essay",
    ieltsType: "academic",
    taskType: "task2",
    score: 6.5,
    rawStatus: GradingStatus.teacher_reviewed,
    displayStatus: "Teacher Reviewed",
  },
    {
    submissionId: "mock-5",
    date: "08/02/2026",
    questionType: "Practice",
    ieltsType: "general",
    taskType: "task1",
    score: 7,
    rawStatus: GradingStatus.processing,
    displayStatus: "Processing",
  },
  {
    submissionId: "mock-6",
    date: "10/02/2026",
    questionType: "Submitted Essay",
    ieltsType: "academic",
    taskType: "task2",
    score: 8,
    rawStatus: GradingStatus.pending,
    displayStatus: "Pending", 
  },
  {
    submissionId: "mock-7",
    date: "12/02/2026",
    questionType: "Submitted Essay",
    ieltsType: "academic",
    taskType: "task2",
    score: 6.5,
    rawStatus: GradingStatus.failed,
    displayStatus: "Failed",  
  },
];
