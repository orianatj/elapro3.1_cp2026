import { useState } from "react";
import { useResetPassword } from "../../hooks/useResetPassword";
import type { PasswordReset } from "../../types/common/Auth";
import resetpassword from "../../assets/auth/resetpassword.png";


type ResetPasswordFormProps = {
    token: string;
    onSuccess: () => void;
    onInvalidToken: () => void;
}

export function ResetPasswordForm({ token, onSuccess, onInvalidToken }: ResetPasswordFormProps) {

    const [newPassword, setNewPassowrd] = useState("");

    const [confirmPassword, setConfirmed] = useState("");

    const [error, setError] = useState("");

    // TanStack mutation hook 
    const resetPasswordMutation = useResetPassword();

    // Handles form submission 
    async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {

        // Prevent browser from performing default page refresh on form submit
        event.preventDefault();

        // Clear previous error before a new submission
        setError("");

        // Construct user password object from controlled form input state
        const passwordDetails: PasswordReset = {
            token,
            newPassword,
            confirmPassword
        };

        // Return error if user has NOT filled out all required form fields 
        if (!newPassword || !confirmPassword) {
            setError("Please complete all required fields.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }


        try {
            // Extract async mutation function (returns a promise when called)
            await resetPasswordMutation.mutateAsync(passwordDetails);

            // Notify parent component that password reset succeeded 
            onSuccess();

            // Clear form state on success 
            setNewPassowrd("");

            // Clear form state on success 
            setConfirmed("");

        } catch (error: any) {
            // Missing or invalid field-level data for password and/ or confirm password
            if (error.response?.status === 422) {
                setError("Your password does not match the complexity requirements.");
            }

            else if (error.response?.status === 400) {
                // Notify parent component that the password reset has been unsuccessful 
                onInvalidToken();
            }
        }
    }

    return (

        // Card container for reset password content and form 
        < div className="auth-card" >

            <img className="auth-icon" src={resetpassword} alt="Reset password icon" width={150} height={150} />

            {/* Header section for reset password page title */}
            < div className="auth-header" >
                <h2 className="auth-title">Reset your password</h2>
                <p className="auth-instruction">Enter your new password</p>
            </div >

            {/* Reset password form */}
            < form onSubmit={handleSubmit} className="auth-form" >


                < div className="form-group" >

                    {/* Password input field */}
                    <label className="required" htmlFor="new-password">New passowrd</label>

                    <input
                        id="new-password"
                        type="password"
                        value={newPassword}
                        autoComplete="off"

                        // Update email state when user types 
                        onChange={(e) => setNewPassowrd(e.target.value)}
                    />
                </div >

                < div className="form-group" >

                    {/* Password input field */}
                    <label className="required" htmlFor="confirm-password">Confirm passowrd</label>

                    <input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        autoComplete="off"


                        // Update email state when user types 
                        onChange={(e) => setConfirmed(e.target.value)}
                    />
                </div >

                {/* Conditionally render error message */}
                {error && <p className="auth-error">{error}</p>}

                {/* Submit password reset request*/}
                <button className="auth-button" type="submit">Reset password</button>

            </form >
        </div >

    );





}