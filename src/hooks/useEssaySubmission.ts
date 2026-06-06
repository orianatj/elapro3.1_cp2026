import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";

// API services
import { getRandomQuestion } from "../services/questionsApi";
import { createSubmission, uploadEssay } from "../services/submissionsApi";

// Types
import type { EssaySubmission } from "../types/student/StudentEssaySubmissionViewData";
import type { QuestionResponse } from "../types/common/api/questions";
import type { SubmitAnswerPayload } from "../types/common/api/submissions";
import type { UploadEssayResponse } from "../types/common/api/uploadFiles"

// Constants
import { ESSAY_SUBMISSION_INITIAL_STATE } from "../constants/essayWritingInitialStates";

// Utils
import { getErrorMessage } from "../utils/errorHandling";
import { buildUploadFormData } from "../utils/uploadUtility";
import { getWordCount } from "../utils/wordCounter";
import type { IeltsType, TaskType } from "../types/student/common/StudentFilter";


export function useEssaySubmission() {

    // Base view data structure, populated with API responses and user input
    const [viewData, setViewData] = useState<EssaySubmission>(ESSAY_SUBMISSION_INITIAL_STATE);

    // UI State for current selections
    const [ieltsType, setIeltsType] = useState<IeltsType | undefined>(undefined);
    const [taskType, setTaskType] = useState<TaskType | undefined>(undefined);
    const [answerText, setAnswerText] = useState("");

    // Set countdown timer dependant to task type (40 mins for Task 2, 20 mins for Task 1)
    const setTimer = (taskType?: TaskType) => {
        if (taskType === "task2")
            return 40 * 60; // 40 minutes in seconds
        return 20 * 60;     // 20 minutes in seconds
    };
    const newTimerValue = setTimer(taskType);

    // Mutation to fetch a new randomquestion based on current selections
    const generateQuestionMutation = useMutation({
        mutationFn: async () => {

            // Basic validation: Ensure selections are made before making API call
            if (!ieltsType || !taskType) {
                throw new Error("Please select both IELTS type and task type to generate a question.");
            }

            // Map UI selections to expected API query parameters
            const response = await getRandomQuestion(
                ieltsType,
                taskType
            );

            return response.data.data as QuestionResponse["data"];
        },


        onSuccess: (data) => {
            // Update task description with API response
            setViewData((prev) => ({
                ...prev,
                taskBar: {
                    ...prev.taskBar,
                    timeRemaining: newTimerValue, // Reset timer based on task type
                    taskTimeLimit: newTimerValue, // Set time limit based on task type
                },
                taskDescription: {
                    ...prev.taskDescription,
                    questionID: data.questionId,
                    questionText: data.questionText
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
                taskType,
                essayResponse: answerText,
                questionId: viewData.taskDescription.questionID,
                customQuestionText: "" // Not applicable for Practice Writing page
            };

            return createSubmission(payload);
        },

        onSuccess: () => {

            setTimeout(() => {
                // Update Submission metadata
                setViewData((prev) => ({
                    ...prev,
                    taskBar: {
                        ...prev.taskBar,
                        isPaused: true,           // Pause timer on submission
                        timeRemaining: 0,
                        taskTimeLimit: 0
                    },
                    taskDescription: {
                        ...prev.taskDescription,
                        questionText: "",         // clear question
                        questionID: ""            // clear reference
                    },
                    answer: {
                        ...prev.answer,
                        submissionDate: new Date().toISOString(),
                        ieltsType: ieltsType!,
                        taskType: taskType!,
                        answerText: ""            // clear answer text                        
                    }
                }));

                setAnswerText(""); // Clear answer input after successful submission                

            }, 5000); // Delay state update to allow user to see success message

        }
    });

    // Handles essay upload and populates editor with extracted text
    const uploadEssayMutation = useMutation({
        mutationFn: async (file: File) => {

            if (!ieltsType || !taskType) {
                throw new Error("Please select IELTS type and task type.");
            }

            // Build upload payload
            const formData = buildUploadFormData(file, ieltsType, taskType);

            // Call upload endpoint
            const response = await uploadEssay(formData);
            return response.data.data as UploadEssayResponse;
        },

        // reset upload success state before starting a new upload
        onMutate: () => {
            setViewData(prev => ({
                ...prev,
                essayUpload: {
                    ...prev.essayUpload,
                    isSuccessful: false,
                    isValid: false,
                    fileProvided: false,
                    fileName: ""
                }
            }));
        },

        // reset upload state if request fails
        onError: () => {
            setViewData(prev => ({
                ...prev,
                essayUpload: {
                    ...prev.essayUpload,
                    isSuccessful: false,
                    isValid: false
                }
            }));
        },

        onSuccess: (data) => {

            setViewData((prev) => ({
                ...prev,
                essayUpload: {
                    ...prev.essayUpload,
                    fileName: data.sourceFile,
                    fileProvided: true,
                    isSuccessful: true,
                    isValid: true
                },
                answer: {
                    ...prev.answer,
                    fromUpload: true
                }
            }));

            // populate editor
            setAnswerText(data.essayText);
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

    // resets upload-related state and clears editor
    const resetUpload = () => {
        setAnswerText("");

        setViewData(prev => ({
            ...prev,
            essayUpload: {
                ...prev.essayUpload,
                fileName: "",
                fileProvided: false,
                isValid: false,
                isSuccessful: false
            },
            answer: {
                ...prev.answer,
                fromUpload: false
            }
        }));
    };



    // Derived ViewData (combines base data with current UI state)
    const computedWordCount = getWordCount(answerText);
    const updatedViewData: EssaySubmission = {
        ...viewData,
        ieltsSelection: {
            ...viewData.ieltsSelection,
            selected: ieltsType
        },

        taskSelection: {
            ...viewData.taskSelection,
            selected: taskType
        },

        taskBar: {
            ...viewData.taskBar,
            userWordCount: computedWordCount
        },

        answer: {
            ...viewData.answer,
            answerText,
            wordCount: computedWordCount
        }
    };

    return {
        viewData: updatedViewData,

        actions: {
            // UI State Setters
            setIeltsType,
            setTaskType,
            setAnswerText,

            // TSQ Trigger functions
            generateQuestion: generateQuestionMutation.mutate,
            submitAnswer: submitAnswerMutation.mutate,
            uploadEssay: uploadEssayMutation.mutate,
            resetUpload
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

            isUploadingEssay: uploadEssayMutation.isPending,
            uploadEssayErrorMessage: uploadEssayMutation.error
                ? getErrorMessage(uploadEssayMutation.error)
                : null,

            isSubmitSuccess: submitAnswerMutation.isSuccess,
            submitSuccessMessage: submitAnswerMutation.isSuccess
                ? "Your answer has been submitted successfully"
                : null
        }
    };
}

