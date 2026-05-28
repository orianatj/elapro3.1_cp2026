import { useState } from "react";
import type { ForgotPassword } from "../../types/common/Auth";
import { useForgotPassword } from "../../hooks/useForgotPassword";
import forgotpassword from "../../assets/auth/forgotpassword.png";
import { Link } from "react-router-dom";



type ForgotPasswordProps = {
    // Define parent callback function
    onSuccess: (email: string) => void;
};



export function ForgotPasswordForm({ onSuccess }: ForgotPasswordProps) {

    const [email, setEmail] = useState("");

    const [error, setError] = useState("");

    // TanStack mutation hook
    const forgotPasswordMutation = useForgotPassword();

    // Handles form submission 
    async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {

        // Prevent browser from performing default page refresh on form submit
        event.preventDefault();

        // Clear previous error before a new submission
        setError("");

        // Construct user email object from controlled form input state
        const userEmail: ForgotPassword = {
            emailAddress: email,
        };

        // Prevent form submission without field input 
        if (!email) {
            setError("Please enter an email address.");
            return;
        }


        try {
            // Extract async mutation function (returns a promise when called)
            await forgotPasswordMutation.mutateAsync(userEmail);

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

        // Card container for forgot password content and form 
        < div className="auth-card" >

            <img className="auth-icon" src={forgotpassword} alt="Forgot password icon" width={130} height={130} />

            {/* Header section for forgot password page title */}
            < div className="auth-header" >
                <h2 className="auth-title">Forgot password?</h2>
                <p className="auth-instruction">Enter the email associated with your account, and we'll email you a verification link to reset your password.</p>
            </div >

            {/* Forgot password form (single field) */}
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

                {/* Submit forgot password request */}
                <button className="auth-button" type="submit">Reset password</button>

                <p className="auth-redirect">Back to
                    <Link to="/login" className="auth-link"> Login</Link>
                </p>
            </form >
        </div >

    );

}