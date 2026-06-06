import type { PracticeWriting } from "../types/student/StudentPracticeWriting";
import type { EssaySubmission, AcceptedFileTypes } from "../types/student/StudentEssaySubmissionViewData";
import { DEFAULT_IELTS_FILTER, DEFAULT_TASK_FILTER } from "./filters";


export const PRACTICE_WRITING_INITIAL_STATE: PracticeWriting = {
    pageHeader: {
        title: "Practice Writing",
        breadcrumb: [
            { label: "Dashboard", link: "/student" },
            { label: "Practice Writing" }
        ]

    },

    taskBar: {
        taskTitle: "Practice Writing Task",
        taskTimeLimit: 60,
        timeRemaining: 0,
        isActive: false,
        isPaused: false,
        targetWordCount: 250,
        userWordCount: 0,
        wordCountUnder: false,
        wordCountOver: false
    },

    ieltsSelection: {
        ...DEFAULT_IELTS_FILTER,
        selected: undefined
    },

    taskSelection: {
        ...DEFAULT_TASK_FILTER,
        selected: undefined
    },

    taskDescription: {
        questionText: "",
        placeHolderText: "Select IELTS type and task type, then click 'Get Task' to receive a writing prompt.",
        questionID: ""
    },

    answer: {
        placeHolderText: "Type your answer here...",
        taskID: 0,
        ieltsType: "",
        taskType: "",
        questionCategory: "",
        answerText: "",
        wordCount: 0,
        submissionDate: "",
        fromUpload: false,
        sections: []
    }
};

export const ESSAY_SUBMISSION_INITIAL_STATE: EssaySubmission = {
    pageHeader: {
        title: "Essay Submission",
        breadcrumb: [
            { label: "Dashboard", link: "/student" },
            { label: "Essay Submission" }
        ]

    },

    taskBar: {
        taskTitle: "Submit Essay for Grading",
        taskTimeLimit: 60,
        timeRemaining: 0,
        isActive: false,
        isPaused: false,
        targetWordCount: 250,
        userWordCount: 0,
        wordCountUnder: false,
        wordCountOver: false
    },

    ieltsSelection: {
        ...DEFAULT_IELTS_FILTER,
        selected: undefined
    },

    taskSelection: {
        ...DEFAULT_TASK_FILTER,
        selected: undefined
    },

    taskDescription: {
        questionText: "",
        placeHolderText: "Upload a question from file, or generate a question to receive a writing prompt.",
        questionID: ""
    },

    essayUpload: {
        placeHolderText: "Upload your essay file here...",
        fileName: "",
        fileType: "" as AcceptedFileTypes,
        filePath: "",
        fileProvided: false,
        isValid: false,
        isSuccessful: false
    },

    answer: {
        placeHolderText: "Upload a question from file, or type your answer here...",
        taskID: 0,
        ieltsType: "",
        taskType: "",
        questionCategory: "",
        answerText: "",
        wordCount: 0,
        submissionDate: "",
        fromUpload: false,
        sections: []
    }
};
