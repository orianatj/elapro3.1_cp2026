// Type defines the Task Answer DTO
export type TaskAnswer = {
    placeHolderText: string;
    taskID: number;
    ieltsType: string;
    taskType: string;
    questionCategory: string;
    answerText: string;
    wordCount: number;
    submissionDate: string;
    fromUpload: boolean;  // Is not applicable to Practice Writing 
    sections: AnswerSection[];
};


export type AnswerSection = {
    id: string;
    label: string;
};