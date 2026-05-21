
// Define a union type to strongly type ieltsType
export type IeltsType = "academic" | "general";

// Define a union type to strongly type taskType
export type TaskType = "task1" | "task2";

// Define a type or Student Progress Tracking chart 
export type StudentProgressTracking = {
    userId?: string;
    fromDate?: string;
    toDate?: string;
    ieltsType?: IeltsType;
    taskType?: TaskType;
};
