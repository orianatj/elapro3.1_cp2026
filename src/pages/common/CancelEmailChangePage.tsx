import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useCancelEmailChange } from "../../hooks/useCancelEmailChange";
import success from "../../assets/auth/success.png";
import failure from "../../assets/auth/failure.png";
import pending from "../../assets/auth/pending.png";

export function CancelEmailChangePage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // Store token extracted from URL
    const token = searchParams.get("token");

    // Create the mutation object
    const cancelEmailChangeMutation = useCancelEmailChange();

    // Call /users/me/email/cancel endpoint to cancel email change when the component mounts
    useEffect(() => {
        // Check a token exists
        if (!token) {
            return;
        }

        console.log("Cancelling email change with token:", token);
        // Call mutation method with token
        cancelEmailChangeMutation.mutate(token);
    }, [token, cancelEmailChangeMutation]);

    // If there is no token display this UI
    if (!token) {
        return (
            <div className="auth-page">
                <div className="auth-card">
                    <img className="auth-icon" src={failure} alt="Invalid Email Change Link" width={100} height={100} />
                    <div className="auth-header">
                        <h2 className="auth-title">Email Change Link Expired</h2>
                        <p className="auth-instruction">Your email change link is invalid or has expired.</p>
                    </div>
                    <button
                        className="auth-button"
                        type="button"
                        onClick={() => {
                            window.location.href = "/settings";
                        }}
                    >
                        Return to Settings
                    </button>
                </div>
            </div>
        );
    }

    // Whilst the cancellation is occurring, display a loading UI
    if (cancelEmailChangeMutation.isPending) {
        console.log("Mutation state: pending");
        return (
            <div className="auth-page">
                <div className="auth-card">
                    <img className="auth-icon" src={pending} alt="Email change loading icon" width={100} height={100} />
                    <div className="auth-header">
                        <h2 className="auth-title">Cancelling email change and locking account... Please reset password to unlock.</h2>
                    </div>
                </div>
            </div>
        );
    }

    // If the token is invalid (expired/used) display this UI
    if (cancelEmailChangeMutation.isError) {
        console.log("Mutation state: error", cancelEmailChangeMutation.error);
        // Since email cancellation works on backend despite network error, redirect to settings
        navigate("/settings");
        return null;
    }

    // If the token is validated display this UI
    if (cancelEmailChangeMutation.isSuccess) {
        console.log("Mutation state: success", cancelEmailChangeMutation.data);
        return (
            <div className="auth-page">
                <div className="auth-card">
                    <img className="auth-icon" src={success} alt="Email change success icon" width={100} height={100} />
                    <div className="auth-header">
                        <h2 className="auth-title">Email Change Cancelled</h2>
                        <p className="auth-instruction">Your email change request has been cancelled.</p>
                    </div>
                    <button
                        className="auth-button"
                        type="button"
                        onClick={() => {
                            navigate("/settings");
                        }}
                    >
                        Return to Settings
                    </button>
                </div>
            </div>
        );
    }

    return null;
}
