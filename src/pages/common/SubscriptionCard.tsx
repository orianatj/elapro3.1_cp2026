import { useViewSubscription } from "../../hooks/useViewSubscription";
import { useUpdateSubscription } from "../../hooks/useUpdateSubscription";
import { useCancelSubscription } from "../../hooks/useCancelSubscription";
import { useState } from "react";
import axios from "axios";
import type { PlanNames } from "../../types/common/billing";

export function SubscriptionCard() {

    // Get user's current subscription details
    const subscriptionQuery = useViewSubscription();

    // State logic for updating plan
    const [planName, setPlanName] = useState<PlanNames>("free_trial");

    const [password, setPassword] = useState("");

    const [isUpdating, setIsUpdating] = useState(false);

    // State logic for cancelling plan
    const [isCancelling, setIsCancelling] = useState(false);
    const [cancelPassword, setCancelPassword] = useState("");


    const updateMutation = useUpdateSubscription();

    const handleSubmit = async () => {
        await updateMutation.mutateAsync({ newPlanName: planName, password });

        await subscriptionQuery.refetch();

        setIsUpdating(false);
    };

    const cancelMutation = useCancelSubscription();

    const handleCancelSubscription = async () => {
        await cancelMutation.mutateAsync(cancelPassword);

        await subscriptionQuery.refetch();

        setIsCancelling(false);
    };


    if (subscriptionQuery.isLoading) {
        return (
            <div>Loading subscription...</div>
        )
    }

    if (axios.isAxiosError(subscriptionQuery.error)) {

        const status = subscriptionQuery.error.response?.status;

        if (status === 401) {
            return (
                <p className="auth-error">You must be logged in to access this feature.</p>
            )
        }


        if (status === 403) {
            return (
                <p className="auth-error">You must have a student account to access this feature.</p>
            )
        }


        if (status === 404) {
            return (
                <p className="auth-error">No subscription data available.</p>
            )
        }


        if (status === 500) {
            return (
                <p className="auth-error">A database error has occurred. Retry your request.</p>
            )
        }

        return (
            <p className="auth-error">Unable to load subscription details.</p>
        );

    }

    // Extract subscription object 
    const subscriptionData = subscriptionQuery.data?.data?.subscription;

    if (!subscriptionData) {
        return null;
    }

    // Create boolean to support conditional rendering of cancellation info
    const showCancellation = subscriptionData.cancellationDate !== null;

    // Convert timestamp into date components if cancellation date not null
    const cancellationDate = showCancellation ? new Date(subscriptionData.cancellationDate)
        .toLocaleDateString("en-AU", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }) : null;

    // Convert timestamp into date components
    const currentPeriodEnd = new Date(subscriptionData.currentPeriodEnd
    ).toLocaleDateString("en-AU", { day: "2-digit", month: "short", year: "numeric" });


    // Helper function to return plan name to UI friendly version
    function formatPlanName(plan: string) {

        const planName = plan.replaceAll("_", " ")
            .replace(/\b\w/g, (char: string) => char.toUpperCase());

        return planName
    };


    // Add formatting and check for free plan 
    const priceDisplay = subscriptionData.currentPlanPrice === 0 ? "Free"
        : `$${subscriptionData.currentPlanPrice}/${subscriptionData.subscriptionTerm}`;


    return (
        <div className="auth-card">

            <h2 className="auth-title">Subscription</h2>

            <p className="auth-p"><strong>Current Plan:</strong> {formatPlanName(subscriptionData.currentPlanName)}</p>

            {subscriptionData.pendingPlanName && (
                <p className="auth-p">
                    <strong>Pending Upgrade:</strong> {formatPlanName(subscriptionData.pendingPlanName)}
                    {" "}
                    (${subscriptionData.pendingPlanPrice})
                </p>
            )}

            <p className="auth-p"><strong>Price:</strong> {priceDisplay}</p>

            <p className="auth-p"><strong>Renews on:</strong> {currentPeriodEnd}</p>

            {showCancellation && <p className="auth-p"><strong>Cancellation Effective:</strong> {cancellationDate}</p>}


            <p className="auth-p"><strong>Remaining Submissions:</strong> {" "}{subscriptionData.remainingSubmissionNumber}{" / "}
                {subscriptionData.planSubmissionLimit ?? "Unlimited"}</p>


            <div className="sub-button-container"><button className="auth-button" onClick={() => { setIsUpdating(true); setIsCancelling(false); }}>Change Subscription
            </button></div>

            <div className="sub-button-container"><button className="sub-cancel-button" onClick={() => { setIsCancelling(true); setIsUpdating(false); }}>Cancel Subscription
            </button></div>

            {isUpdating && (
                <div className="auth-form">

                    <p className="auth-p"><strong>New Plan</strong></p>

                    <select className="subscription-select"
                        value={planName}
                        onChange={(e) =>
                            setPlanName(e.target.value as PlanNames)
                        }
                    >
                        <option value="free_trial">Free Trial</option>
                        <option value="general">General</option>
                        <option value="academic">Academic</option>
                        <option value="ukvi_general">UKVI General</option>
                        <option value="ukvi_academic">UKVI Academic</option>
                        <option value="life_skills">Life Skills</option>
                        <option value="retake">Retake</option>
                    </select>


                    <p className="auth-p"><strong>Password</strong></p>

                    <input className="auth-form input"
                        type="password"
                        autoComplete="off"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />

                    <button className="auth-button" onClick={handleSubmit}>
                        Save
                    </button>

                    <button className="auth-button" onClick={() => setIsUpdating(false)}>
                        Cancel
                    </button>

                </div>
            )}

            {isCancelling && (
                <>
                    <p className="auth-p"><strong>Password</strong></p>

                    <div className="auth-form"><input className="auth-form input"
                        type="password"
                        value={cancelPassword}
                        autoComplete="off"
                        onChange={(e) => setCancelPassword(e.target.value)}
                    /></div>

                    <p className="sub-p">
                        Your subscription will remain active until the end of the
                        current billing period.
                    </p>

                    <button className="sub-cancel-button" onClick={handleCancelSubscription}>
                        Confirm Cancellation
                    </button>

                    <div className="sub-button-container"><button className="auth-button" onClick={() => setIsCancelling(false)}>
                        Back
                    </button></div>
                </>
            )}

        </div>
    );

}