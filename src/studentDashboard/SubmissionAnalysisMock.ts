// Mock submission analysis data representing a backend response

export const mockSubmissionAnalysis = {
    id: "mock-1",
    ieltsType: "academic",
    taskType: "task2",
    submittedAt: "2026-05-01T10:00:00Z",
    duration: "45 mins",

    score: {
        overall: 6.5,
        criteria: [
            {
                type: "task-response",
                score: 6,
                explanation: "Sample explanation for task response."
            },
            {
                type: "coherence-cohesion",
                score: 6.5,
                explanation: "Sample explanation for coherence and cohesion."
            },
            {
                type: "lexical-resource",
                score: 7,
                explanation: "Sample explanation for lexical resource."
            },
            {
                type: "grammatical-range-accuracy",
                score: 6, explanation: "Sample explanation for grammatical range and accuracy."
            },
        ],
        explanation: "The is a sample explanation. Try using the live backend to get a real explanation based on the submitted essay! ;)",
    },

    response: {
        essayText: "This is a sample essay response for testing purposes.",
    },

    question: {
        placeHolderText: "Task Description",
        id: "1",
        taskID: 1,
        text: "Some people think technology is making people less social. Discuss both views.",
    },
};

