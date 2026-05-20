import { useState } from "react";
import { ResendVerificationForm } from "./ResendVerificationForm";
import failure from "../../assets/auth/failure.png";

export function InvalidVerificationLink() {

    // Store email address after successful resend request
    const [resentEmail, setResentEmail] = useState("");

    const [showResendForm, setShowResendForm] = useState(false)

    // Conditionally render success confirmation after resend succeeds 

    if (resentEmail) {
        return (

            <div className="auth-card">

                <div className="auth-header">
                    <h2>Email verification link sent</h2>

                    <p className="auth-instruction">
                        A new verification email has been sent to:
                    </p>

                    <p className="auth-email">
                        {resentEmail}
                    </p>

                    <p className="auth-instruction">
                        Please check your inbox and follow the verification link.
                    </p>
                </div>
            </div>

        );
    }

    if (showResendForm) {
        // Render resend verification form 
        return (
            <ResendVerificationForm onSuccess={setResentEmail} />
        );
    }

    // Default invalid/expired token state
    return (

        <div className="auth-card">
            <img className="auth-icon" src={failure} alt="Invalid Verification Link" width={100} height={100} />
            <div className="auth-header">
                <h2 className="auth-title">Account Verification Link Expired</h2>
                <p className="auth-instruction">Your account verification link is invalid or has expired.</p>
            </div>

            <button className="auth-button" onClick={() => setShowResendForm(true)}>
                Resend verification email
            </button>

        </div>
    );

}

