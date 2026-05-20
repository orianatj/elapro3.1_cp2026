import { useState } from "react";
import { ForgotPasswordSuccess } from "./ForgotPasswordSuccess";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

export function ForgotPasswordPage() {

    // Controls which card is rendered 
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Store succesful submitted email for success message 
    const [submittedEmail, setSubmittecEmail] = useState("");


    return (
        // Full-page container used for centering the forgot password card
        <div className="auth-page">

            {isSubmitted ? (

                <ForgotPasswordSuccess email={submittedEmail} />

            ) : (

                // Pass the call back function
                <ForgotPasswordForm onSuccess={(email) => {

                    setSubmittecEmail(email);

                    setIsSubmitted(true);
                }}

                />
            )}

        </div>

    )
}