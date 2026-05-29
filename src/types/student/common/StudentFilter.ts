// Type defines reusable filter DTO for student dashboard pages
export type StudentFilter<T extends string> = {
    title: string;  // ex. "Choose an IELTS Type"
    selected: T | undefined;  // ex. "task1"
    options: FilterOption<T>[];
};

// Define union types for filters 
export type IeltsType = "academic" | "general";
export type TaskType = "task1" | "task2";
export type ViewBy = "weekly" | "monthly" | "quarterly";

// Define union type to account for UI selection option 'All'
export type FilterValue<T extends string> = T | "all";


// Type defines a filter option
export type FilterOption<T extends string> = {
    value: T;           // ex. "academic" or "task1"
    label: string;      // ex. "Academic" or "Task 1"
    disabled?: boolean  // allows UI to disable options
};




