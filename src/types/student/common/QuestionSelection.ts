// Type defines Question Option DTO
export type QuestionSelectionMenu<T extends string> = {
    title: string;  // ex. "Choose a question"
    selected: T;  // ex. "formal-letters"
    // ex. [{value: "formal-letter", label:"Formal Letter"}, {value: "semiformal-letter", label:"Semi-Formal Letter"}]
    options: QuestionOption<T>[];  
    isConfirmed: boolean;
};

// Type defines Task 1 Question Selection union type  
export type TaskOneQuestionType = "opinion" | "problem_solution" | "advantages_disadvantages" | "discussion"

// Type defines Task 2 Question Selection union type 
export type TaskTwoQuestionType = "formal-letter" | "semiformal-letter" | "informal-letter";

// Type defines a Question Option
export type QuestionOption<T extends string> = {
    value: T;
    label: string;
};



