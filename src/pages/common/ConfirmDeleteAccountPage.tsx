import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useConfirmDeleteAccount } from "../../hooks/useConfirmDeleteAccount";
import success from "../../assets/auth/success.png";
import failure from "../../assets/auth/failure.png";
import pending from "../../assets/auth/pending.png";

export function ConfirmDeleteAccountPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // Store token extracted from URL
    const token = searchParams.get("token");

    // Create the mutation object
    const confirmDeleteAccountMutation = useConfirmDeleteAccount();

    // Call /users/me/delete-confirm endpoint to confirm account deletion when the component mounts
    useEffect(() => {
        // Check a token exists
        if (!token) {
            return;
        }

        console.log("Confirming account deletion with token:", token);
        // Call mutation method with token
        confirmDeleteAccountMutation.mutate(token);
    }, [token, confirmDeleteAccountMutation]);

    // If there is no token display this UI
    if (!token) {
        return (
            <div className="auth-page">
                <div className="auth-card">
                    <img className="auth-icon" src={failure} alt="Invalid Delete Link" width={100} height={100} />
                    <div className="auth-header">
                        <h2 className="auth-title">Delete Link Expired</h2>
                        <p className="auth-instruction">Your account deletion link is invalid or has expired.</p>
                    </div>
                    <button
                        className="auth-button"
                        type="button"
                        onClick={() => {
                            window.location.href = "/login";
                        }}
                    >
                        Return to Login
                    </button>
                </div>
            </div>
        );
    }

    // Whilst the confirmation is occurring, display a loading UI
    if (confirmDeleteAccountMutation.isPending) {
        console.log("Mutation state: pending");
        return (
            <div className="auth-page">
                <div className="auth-card">
                    <img className="auth-icon" src={pending} alt="Account deletion loading icon" width={100} height={100} />
                    <div className="auth-header">
                        <h2 className="auth-title">Deleting your account...</h2>
                    </div>
                </div>
            </div>
        );
    }

    // If the token is invalid (expired/used) display this UI
    if (confirmDeleteAccountMutation.isError) {
        console.log("Mutation state: error", confirmDeleteAccountMutation.error);
        return (
            <div className="auth-page">
                <div className="auth-card">
                    <img className="auth-icon" src={failure} alt="Invalid Delete Link" width={100} height={100} />
                    <div className="auth-header">
                        <h2 className="auth-title">Delete Link Expired</h2>
                        <p className="auth-instruction">Your account deletion link is invalid or has expired.</p>
                    </div>
                    <button
                        className="auth-button"
                        type="button"
                        onClick={() => {
                            window.location.href = "/login";
                        }}
                    >
                        Return to Login
                    </button>
                </div>
            </div>
        );
    }

    // If the token is validated display this UI
    if (confirmDeleteAccountMutation.isSuccess) {
        console.log("Mutation state: success", confirmDeleteAccountMutation.data);
        return (
            <div className="auth-page">
                <div className="auth-card">
                    <img className="auth-icon" src={success} alt="Account deletion success icon" width={100} height={100} />
                    <div className="auth-header">
                        <h2 className="auth-title">Account Deleted</h2>
                        <p className="auth-instruction">Your account has been successfully deleted.</p>
                    </div>
                    <button
                        className="auth-button"
                        type="button"
                        onClick={() => {
                            navigate("/login");
                        }}
                    >
                        Return to Login
                    </button>
                </div>
            </div>
        );
    }

    return null;
}
