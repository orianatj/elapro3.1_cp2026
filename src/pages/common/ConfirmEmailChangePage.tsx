import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useConfirmEmailChange } from "../../hooks/useConfirmEmailChange";
import success from "../../assets/auth/success.png";
import failure from "../../assets/auth/failure.png";
import pending from "../../assets/auth/pending.png";

export function ConfirmEmailChangePage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // Store token extracted from URL
    const token = searchParams.get("token");

    // Create the mutation object
    const confirmEmailChangeMutation = useConfirmEmailChange();

    // Call /users/me/email endpoint to confirm email change when the component mounts
    useEffect(() => {
        // Check a token exists
        if (!token) {
            return;
        }

        // Call mutation method with token
        confirmEmailChangeMutation.mutate(token);
    }, [token, confirmEmailChangeMutation]);

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

    // Whilst the confirmation is occurring, display a loading UI
    if (confirmEmailChangeMutation.isPending) {
        return (
            <div className="auth-page">
                <div className="auth-card">
                    <img className="auth-icon" src={pending} alt="Email change loading icon" width={100} height={100} />
                    <div className="auth-header">
                        <h2 className="auth-title">Updating your email...</h2>
                    </div>
                </div>
            </div>
        );
    }

    // If the token is invalid (expired/used) display this UI
    if (confirmEmailChangeMutation.isError) {
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

    // If the token is validated display this UI
    if (confirmEmailChangeMutation.isSuccess) {
        return (
            <div className="auth-page">
                <div className="auth-card">
                    <img className="auth-icon" src={success} alt="Email change success icon" width={100} height={100} />
                    <div className="auth-header">
                        <h2 className="auth-title">Email Updated</h2>
                        <p className="auth-instruction">Your email address has been successfully updated!</p>
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
