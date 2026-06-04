import { useQueryClient } from "@tanstack/react-query";
import { useRequestReview } from "../hooks/useRequestReview";
import { useState } from "react";

// UI contract for submission-level actions
import type { SubmissionActions }
    from "../types/student/StudentSubmissionAnalysisViewData";

type SubmissionActionsBarProps = {
    actions: SubmissionActions;
    submissionId: string;
};

// Renders available submission actions based on UI-ready flags
export function SubmissionActionsBar({ actions, submissionId }: SubmissionActionsBarProps) {

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
            {actions.canReattempt && <button>Reattempt Essay</button>}

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
            {showMessage && (
                <div className="review-requested-message">
                    Your review request has been submitted.
                </div>
            )}

        </div>
    );
}