// Type defines reusable filter DTO for student dashboard pages
export type StudentFilter<T> = {
    title: string;  // ex. "Choose an IELTS Type"
    selected: T;  // ex. "task-one"
    options: FilterOption<T>[];
};

// Define union types for filters 
export type IeltsType = "academic" | "general";
export type TaskType = "task-one" | "task-two";
export type ViewBy = "weekly" | "monthly" | "quarterly";

// Define union type to account for UI selection option 'All'
export type FilterValue<T> = T | "all";

// Type defines a filter option
export type FilterOption<T> = {
    value: T;  // ex. "academic" or "task-one"
    label: string;  // ex. "Academic" or "Task 1"
};

<<<<<<< HEAD
=======
// Type defines reusable filter DTO for student dashboard pages
export type StudentFilter<T> = {
    title: string;  // ex. "Choose an IELTS Type"
    selected?: T;  // ex. "task-one"
    options: FilterOption<T>[];
};


>>>>>>> 7ad6a8150404c9e7eb6c79936ddea7b274951b37

