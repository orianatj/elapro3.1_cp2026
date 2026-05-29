import type { PracticeWriting } from "../types/student/StudentPracticeWriting";
import { DEFAULT_IELTS_FILTER, DEFAULT_TASK_FILTER } from "./filters";


export const PRACTICE_WRITING_INITIAL_STATE: PracticeWriting = {
    pageHeader: {
        title: "Practice Writing",
        breadcrumb: []
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
        placeHolderText: "Select IELTS type and task type, then click 'Generate Question' to receive a writing prompt.",
        taskID: 0,
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

