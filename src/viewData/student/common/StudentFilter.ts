// Define union types for filters 
export type IeltsType = "academic" | "general";
export type TaskType = "task-one" | "task-two";
export type ViewBy = "weekly" | "monthly" | "quarterly";


// Type defines a filter option
export type FilterOption<T> = {
    value: T;  // ex. "academic" or "task-one"
    label: string;  // ex. "Academic" or "Task 1"
};

// Type defines reusable filter DTO for student dashboard pages
export type StudentFilter<T> = {
    tilte: string;  // ex. "Choose an IELTS Type"
    selected?: T;  // ex. "task-one"
    options: FilterOption<T>[];
};



