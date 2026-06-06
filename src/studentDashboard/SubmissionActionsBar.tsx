import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRequestReview } from "../hooks/useRequestReview";

// UI contract for submission-level actions
import type { SubmissionActions }
    from "../types/student/StudentSubmissionAnalysisViewData";
import type { IeltsType } from "../types/student/StudentDashboard";
import type { TaskType } from "../types/student/common/StudentFilter";

type SubmissionActionsBarProps = {
    actions: SubmissionActions;    
    submissionId: string;
    reattempt: {
        ieltsType: IeltsType;
        taskType: TaskType;
        questionId: string;
    }
};


// Renders available submission actions based on UI-ready flags
export function SubmissionActionsBar({ actions, submissionId, reattempt }: SubmissionActionsBarProps) {

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutateAsync, isPending } = useRequestReview();
    const [showMessage, setShowMessage] = useState(false);

    const handleRequestReview = async () => {
        try {
            await mutateAsync(submissionId);

            // Show temporary success message to hide after 5 seconds
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 5000);

            // Re-fetch the backend state
            queryClient.invalidateQueries({
                queryKey: ["submissionAnalysis", submissionId],
            });

        } catch (error) {
            console.error("Error requesting review:", error);
        }
    };

    return (
        <div className="submission-actions-bar">
            {/* Navigate to a new essay attempt */}

            {actions.canReattempt && (
                <button
                    onClick={() =>
                        navigate("/student/essay-submission", {
                            state: {
                                ieltsType: reattempt.ieltsType,
                                taskType: reattempt.taskType,
                                questionId: reattempt.questionId,
                            },
                        })
                    }
                >
                    Reattempt Essay
                </button>
            )}


            {/* Download submission report */}
            {actions.canDownloadReport && <button>Download Report</button>}

            {/* Request a review of the submission */}
            <button
                onClick={handleRequestReview}
                disabled={!actions.canRequestReview || isPending}
            >
                {!actions.canRequestReview
                    ? "Review Requested"
                    : isPending
                        ? "Requesting..."
                        : "Request Review"}
            </button>

            {/* Show a temporary message if the review request was submitted */}
            {
                showMessage && (
                    <div className="review-requested-message">
                        Your review request has been submitted.
                    </div>
                )
            }

        </div >
    );
}