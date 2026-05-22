import { useState } from "react";
import { SignupForm } from "./SignupForm"
import { VerifyEmailSent } from "./VerifyEmailSent";
import { ResendVerificationForm } from "./ResendVerificationForm";

type SignupView = | "signup" | "verify-email-sent" | "resend-verification";



export function SignupPage() {

    // Controls which auth screen is rendered 
    const [view, setView] = useState<SignupView>("signup");

    // Store succesful submitted email for success message 
    const [submittedEmail, setSubmittecEmail] = useState("");


    return (
        // Full-page container used for centering the registration card
        <div className="auth-page">

            {/* Sign-up Form */}

            {view === "signup" && (

                <SignupForm

                    onSuccess={(email) => {

                        // Store email submitted 
                        setSubmittecEmail(email);

                        // Move to verify email screen
                        setView("verify-email-sent");
                    }}

                />
            )}

            {/* Verify Email Screen */}

            {view === "verify-email-sent" && (

                <VerifyEmailSent

                    email={submittedEmail}

                    onResendRequested={() => {

                        // Move to verify email screen 
                        setView("resend-verification");
                    }}

                />

            )}

            {/* Resend Verification Email Screen */}

            {view === "resend-verification" && (

                <ResendVerificationForm

                    onSuccess={(email) => {

                        // Store latest email used
                        setSubmittecEmail(email);

                        // move to verify email screen
                        setView("verify-email-sent");
                    }}

                />

            )}

        </div>

    );

}

