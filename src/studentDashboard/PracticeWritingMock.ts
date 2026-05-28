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
    taskTimeLimit: 1200,       // 20 minutes
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
    selected: "academic", // default selected
    options: [
      { value: "academic", label: "Academic" },
      { value: "general", label: "General" }
    ]
  },

  taskSelection: {
    title: "Choose a Task Type",
    selected: "task-two", // default selected
    options: [
      { value: "task-one", label: "Task 1" },
      { value: "task-two", label: "Task 2" }
    ]
  },

  taskDescription: {
    placeHolderText: "",
    taskID: 1,
    questionID: 101,
    questionText:
      "Rich countries often give money to poorer countries, but this does not always solve poverty. Discuss why this is the case and suggest solutions."
  },

  answer: {

    placeHolderText: "Write your answer here...",
    taskID: "1", 
    submissionGroup: 0, 
    ieltsType: "Academic", 
    taskType: "Task 2", 
    questionCategory: "Essay",
    answerText: "",
    wordCount: 0,
    submissionDate: "",
    fromUpload: false,
    sections: []
  }
};

