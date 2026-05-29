
import { GradingStatus } from "../types/common/GradingStatus";

import type { SubmissionTableRow } from "../types/student/StudentSubmissionsViewData";


export const mockSubmissionRows: SubmissionTableRow[] = [
  {
    submissionId: "mock-1",
    date: "01/02/2026",
    essayType: "Practice",
    ieltsType: "academic",
    taskType: "task2",
    score: 7.5,
    status: GradingStatus.ai_graded,
  },
  {
    submissionId: "mock-2",
    date: "03/02/2026",
    essayType: "Submitted Essay",
    ieltsType: "general",
    taskType: "task1",
    score: 6,
    status: GradingStatus.processing,
  },
  {
    submissionId: "mock-3",
    date: "05/02/2026",
    essayType: "Submitted Essay",
    ieltsType: "academic",
    taskType: "task2",
    score: 4.5,
    status: GradingStatus.pending,
  },
  {
    submissionId: "mock-4",
    date: "06/02/2026",
    essayType: "Submitted Essay",
    ieltsType: "academic",
    taskType: "task2",
    score: 6.5,
    status: GradingStatus.teacher_reviewed,
  },
    {
    submissionId: "mock-5",
    date: "08/02/2026",
    essayType: "Practice",
    ieltsType: "general",
    taskType: "task1",
    score: 7,
    status: GradingStatus.processing,
  },
  {
    submissionId: "mock-6",
    date: "10/02/2026",
    essayType: "Submitted Essay",
    ieltsType: "academic",
    taskType: "task2",
    score: 8,
    status: GradingStatus.pending,
  },
  {
    submissionId: "mock-7",
    date: "12/02/2026",
    essayType: "Submitted Essay",
    ieltsType: "academic",
    taskType: "task2",
    score: 6.5,
    status: GradingStatus.failed,
  },
];
