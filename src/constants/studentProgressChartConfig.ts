import type { CriterionToggleConfig, FilterMetadata, IeltsFilterOptions, TaskFilterOptions } from "../types/common/StudentDashboard";

export const criterionToggleConfig: CriterionToggleConfig[] = [

    { key: "meanOverallScore", label: "Overall Score" },

    { key: "meanTaskResponse", label: "Task Response" },

    { key: "meanCoherenceCohesion", label: "Coherence & Cohesion" },

    { key: "meanLexicalResource", label: "Lexical Resource" },

    { key: "meanGrammaticalRangeAccuracy", label: "Grammatical Range & Accuracy" }

];


export const filterConfig: FilterMetadata[] = [

    { filterKey: "ieltsType", label: "IELTS Type" },

    { filterKey: "taskType", label: "Task Type" }
];


export const IELTS_TYPE_OPTIONS: IeltsFilterOptions[] = [

    { value: "academic", label: "Academic" },

    { value: "general", label: "General" }
];

export const TASK_TYPE_OPTIONS: TaskFilterOptions[] = [

    { value: "task1", label: "Task 1" },

    { value: "task2", label: "Task 2" }
];