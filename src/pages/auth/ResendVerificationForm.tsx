import { useState } from "react";
import { useResendVerify } from "../../hooks/useResendVerify";
import type { EmailRequest } from "../../types/common/Auth";
import verificationexpiry from "../../assets/auth/verificationexpiry.png";

type ResendVerifyProps = {
    onSuccess: (email: string) => void;
}

export function ResendVerificationForm({ onSuccess }: ResendVerifyProps) {

    const [email, setEmail] = useState("");

    const [error, setError] = useState("");

    // TanStack mutation hook
    const resendVerifyMutation = useResendVerify();

    // Handles form submission 
    async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {

        // Prevent browser from performing default page refresh on form submit
        event.preventDefault();

        // Clear previous error before a new submission
        setError("");

        // Construct user email object from controlled form input state
        const userEmail: EmailRequest = {
            emailAddress: email
        };

        // Prevent form submission without field input 
        if (!email) {
            setError("Please enter an email address.");
            return;
        }


        try {
            // Extract async mutation function (returns a promise when called)
            await resendVerifyMutation.mutateAsync(userEmail);

            // Notify parent component
            onSuccess(email);

            // Clear form state on success 
            setEmail("");

        } catch (error: any) {
            // Missing or invalid field-level data for email 
            if (error.response?.status === 422) {
                setError("Please enter a valid email address.");
            }
        }

    }


    return (
        // Card container for resend verification email content and form 
        < div className="auth-card" >

            <img className="auth-icon" src={verificationexpiry} alt="Verification email expired icon" width={150} height={150} />

            {/* Header section for resend verification email card title */}
            < div className="auth-header" >
                <h2 className="title-resend-verify">Email verification link expired?</h2>
                <p className="auth-instruction">Enter the email used to sign-up, and we'll email you a new verification link.</p>
            </div >

            {/* Resend Verification Email (single field) */}
            < form onSubmit={handleSubmit} className="auth-form" >

                {/* Email input field */}
                < div className="form-group" >
                    <label className="required" htmlFor="email">Email</label>

                    <input
                        id="email"
                        type="email"
                        autoComplete="off"
                        value={email}

                        // Update email state when user types 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div >

                {/* Conditionally render error message */}
                {error && <p className="auth-error">{error}</p>}

                {/* Submit resend verification request */}
                <button className="auth-button" type="submit">Resend verification link</button>

            </form >
        </div >
    )
}