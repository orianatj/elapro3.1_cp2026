import type { StudentFilter, IeltsType, TaskType } 
from "../types/student/common/StudentFilter";

export const DEFAULT_IELTS_FILTER: StudentFilter<IeltsType | undefined> = {
  title: "IELTS Type",
  selected: undefined,
  options: [
    { label: "Academic", value: "academic" },
    { label: "General", value: "general" }
  ]
};

export const DEFAULT_TASK_FILTER: StudentFilter<TaskType | undefined> = {
  title: "Task Type",
  selected: undefined,
  options: [
    { label: "Task 1", value: "task-one" },
    { label: "Task 2", value: "task-two" }
  ]
};
