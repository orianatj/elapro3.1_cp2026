import type { PracticeWriting } from "../types/student/StudentPracticeWriting";

export const mockPracticeWriting: PracticeWriting = {
  pageHeader: {
    title: "Practice Writing",
    breadcrumb: [
      { label: "Dashboard", link: "/student" },
      { label: "Practice Writing" }
    ]
  },

  taskBar: {
    taskTitle: "Task Session",
    taskTimeLimit: 1200,
    timeRemaining: 1200,
    isActive: false,
    isPaused: false,
    targetWordCount: 250,
    userWordCount: 0,
    wordCountUnder: false,
    wordCountOver: false,
  },

  ieltsSelection: {
    title: "Choose an IELTS Type",
    selected: undefined,
    options: [
      { value: "academic", label: "Academic" },
      { value: "general", label: "General" }
    ]
  },

  taskSelection: {
    title: "Choose a Task Type",
    selected: undefined,
    options: [
      { value: "task-one", label: "Task 1" },
      { value: "task-two", label: "Task 2" }
    ]
  },

  taskDescription: {
    placeHolderText: "",
    taskID: 1,
    questionID: 1,
    questionText: ""
  },

  answer: {
    placeHolderText: "",
    taskID: "",
    submissionGroup: 0,
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