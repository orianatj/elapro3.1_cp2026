import type { StudentFilter, IeltsType, TaskType } 
from "../types/student/common/StudentFilter";

export const DEFAULT_IELTS_FILTER: StudentFilter<IeltsType> = {
  title: "IELTS Type",
  selected: undefined,
  options: [
    { label: "Academic", value: "academic" },
    { label: "General", value: "general" }
  ]
};

export const DEFAULT_TASK_FILTER: StudentFilter<TaskType> = {
  title: "Task Type",
  selected: undefined,
  options: [
    { label: "Task 1", value: "task1" },
    { label: "Task 2", value: "task2" }
  ]
};
