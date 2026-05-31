
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";

// API services
import { getRandomQuestion } from "../services/questionsApi";
import { createSubmission } from "../services/submissionsApi";

// Types
import type { PracticeWriting } from "../types/student/StudentPracticeWriting";
import type { GetQuestionResponse } from "../types/common/api/questions";
import type { SubmitAnswerPayload } from "../types/common/api/submissions";

// Constants
import { PRACTICE_WRITING_INITIAL_STATE } from "../constants/PracticeWritingInitialState";

// Utils
import { getErrorMessage } from "../utils/errorHandling";
import { mapTaskTypeToApi, mapIeltsTypeToApi } from "../utils/ieltsTaskApiMapper";
import type { IeltsType, TaskType } from "../types/student/common/StudentFilter";


export function usePracticeWriting() {

    // Base view data structure, populated with API responses and user input
    const [viewData, setViewData] = useState<PracticeWriting>(PRACTICE_WRITING_INITIAL_STATE);

    // UI State for current selections
    const [ieltsType, setIeltsType] = useState<IeltsType | undefined>(undefined);
    const [taskType, setTaskType] = useState<TaskType | undefined>(undefined);
    const [answerText, setAnswerText] = useState("");
    const [wordCount, setWordCount] = useState(0);

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

            // Basic validations
            // Ensure required selections are made before making API call
            if (!ieltsType || !taskType) {
                throw new Error("Please select IELTS type and task type.");
            }

            // Ensure a task has been generated before allowing submission
            if (!viewData.taskDescription.questionID) {
                throw new Error("Please generate a question before submitting an answer.");
            }

            // Ensure answer is not empty before making API call
            if (!answerText.trim()) {
                throw new Error("Please write an answer before submitting.");
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
        },

        onSuccess: () => {
            // Update Submission metadata
            setViewData((prev) => ({
                ...prev,
                answer: {
                    ...prev.answer,
                    submissionDate: new Date().toISOString(),
                    ieltsType: ieltsType!,
                    taskType: taskType!,
                    taskID: prev.taskDescription.taskID
                }
            }));
        }
    });


    // Auto-clear generate question error after 3 seconds
    useEffect(() => {
        if (generateQuestionMutation.error) {

            const timer = setTimeout(() => {
                generateQuestionMutation.reset();
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [generateQuestionMutation.error]);

    // Auto-clear submission success/error after 3 seconds
    useEffect(() => {
        if (submitAnswerMutation.isSuccess || submitAnswerMutation.error) {

            const timer = setTimeout(() => {
                submitAnswerMutation.reset(); // clears success + error state
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [submitAnswerMutation.isSuccess, submitAnswerMutation.error]);


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
