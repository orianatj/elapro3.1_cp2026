
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

// API services
import { getRandomQuestion } from "../services/questionsApi";
import { createSubmission } from "../services/submissionsApi";

// Types
import type { PracticeWriting } from "../types/student/StudentPracticeWriting";
import type { GetQuestionResponse } from "../types/common/api/questions";
import type { SubmitAnswerPayload } from "../types/common/api/submissions";

// Utils
import { getErrorMessage } from "../utils/errorHandling";
import { mapTaskTypeToApi, mapIeltsTypeToApi } from "../utils/ieltsTaskApiMapper";

// Mock (temporary until API integration is complete)
import { mockPracticeWriting } from "../studentDashboard/PracticeWritingMock";


export function usePracticeWriting() {

    // Base view data (initially from mock, will be updated via API)
    const [viewData, setViewData] = useState<PracticeWriting>(mockPracticeWriting);

    // UI State for current selections
    const [ieltsType, setIeltsType] = useState(viewData.ieltsSelection.selected);
    const [taskType, setTaskType] = useState(viewData.taskSelection.selected);
    const [answerText, setAnswerText] = useState(viewData.answer.answerText ?? "");
    const [wordCount, setWordCount] = useState(viewData.answer.wordCount);

    // Mutation to fetch a new question based on current selections
    const generateQuestionMutation = useMutation({
        mutationFn: async () => {

            // Basic validation: Ensure selections are made before making API call
            if (!ieltsType || !taskType) {
                throw new Error("Please select both IELTS type and task type to generate a question.");
            }

            // Map UI selections to expected API payload format
            const mappedIeltsType = mapIeltsTypeToApi(ieltsType);

            const mappedTaskType = mapTaskTypeToApi(taskType);

            const response = await getRandomQuestion(
                mappedIeltsType,
                mappedTaskType
            );

            return response.data;
        },

        onSuccess: (data: GetQuestionResponse) => {
            // Update task description with API response
            setViewData((prev) => ({
                ...prev,
                taskDescription: {
                    ...prev.taskDescription,
                    questionText: data.questionText,
                    taskID: data.taskId,
                    questionID: data.questionId
                }
            }));
        }
    });


    // Mutation to submit the answer
    const submitAnswerMutation = useMutation({
        mutationFn: async () => {

            // Basic validation: Ensure answer is not empty before making API call
            if (!answerText.trim()) {
                throw new Error("Please write an answer before submitting.");
            }

            // Ensure required selections are made
            if (!ieltsType || !taskType) {
                throw new Error("Please select IELTS type and task type.");
            }

            // Map UI selections to expected API payload format
            const payload: SubmitAnswerPayload = {
                ieltsType,
                taskType: mapTaskTypeToApi(taskType),
                taskId: viewData.taskDescription.taskID,
                essayResponse: answerText,
                questionId: viewData.taskDescription.questionID,
                customQuestionText: "" // Not applicable for Practice Writing page
            };

            return createSubmission(payload);
        }
    });


    // Derived ViewData (combines base data with current UI state)
    const updatedViewData: PracticeWriting = {
        ...viewData,
        ieltsSelection: {
            ...viewData.ieltsSelection,
            selected: ieltsType
        },

        taskSelection: {
            ...viewData.taskSelection,
            selected: taskType
        },

        answer: {
            ...viewData.answer,
            answerText, 
            wordCount
        }
    };

    return {
        viewData: updatedViewData,

        actions: {
            // UI State Setters
            setIeltsType,
            setTaskType,
            setAnswerText,
            setWordCount,

            // TSQ Trigger functions
            generateQuestion: generateQuestionMutation.mutate,
            submitAnswer: submitAnswerMutation.mutate
        },

        state: {
            // Loading and error state from TSQ
            isGeneratingQuestion: generateQuestionMutation.isPending,
            generateQuestionErrorMessage: generateQuestionMutation.error
                ? getErrorMessage(generateQuestionMutation.error)
                : null,

            isSubmittingAnswer: submitAnswerMutation.isPending,
            submitAnswerErrorMessage: submitAnswerMutation.error
                ? getErrorMessage(submitAnswerMutation.error)
                : null,

            isSubmitSuccess: submitAnswerMutation.isSuccess,
            submitSuccessMessage: submitAnswerMutation.isSuccess
                ? "Your answer has been submitted successfully"
                : null
        }
    };
}
