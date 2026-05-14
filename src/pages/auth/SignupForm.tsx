import type { Registration } from "../../types/common/Auth";
import { useRegister } from "../../hooks/useRegister";
import { useState } from "react";
import { Link } from "react-router-dom";

type SignupProps = {
    // Define parent callback function
    onSuccess: (email: string) => void;
};

export function SignupForm({ onSuccess }: SignupProps) {

    // Form state
    const [firstName, setFirstName] = useState("");

    const [middleName, setMiddleName] = useState("");

    const [lastName, setLastName] = useState("");

    const [emailAddress, setEmailAddress] = useState("");

    const [phoneNumber, setPhoneNumber] = useState("");

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");


    // TanStack mutation hook
    const signupMutation = useRegister();

    // Handles registration form submission
    async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {

        // Prevent browser from performing default page refresh on form submit
        event.preventDefault();

        // Clear previous error before new submission
        setError("");

        // Initial object contains only required form fields 
        const registrationDetails: Registration = {
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPassword,
        };


        // Only include optional fields if they contain values
        if (middleName.trim()) {
            registrationDetails.middleName = middleName;
        }

        if (phoneNumber.trim()) {
            registrationDetails.phoneNumber = phoneNumber;
        }

        // Return error if user has NOT filled out all required form fields 
        if (!firstName || !lastName || !emailAddress || !password || !confirmPassword) {
            setError("Please complete all required fields.");
            return;
        }

        // Return error message if password and confirm password fields do not match
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }


        try {

            // Extract async mutation function (returns a promise when called)
            await signupMutation.mutateAsync(registrationDetails);

            // Notify the parent component 
            onSuccess(emailAddress);

            // Reset form fields on success 
            setFirstName("");
            setLastName("");
            setMiddleName("");
            setEmailAddress("");
            setPhoneNumber("");
            setPassword("");
            setConfirmPassword("");


        } catch (error: any) {
            //  Email already registered, or password validation failed (400)
            if (error.response?.status === 400) {
                setError("We couldn’t create your account. Your email may already be registered, or your password may not meet the required criteria.");
            }

            // Duplicate email (409)
            else if (error.response?.status === 409) {
                setError("An account with this email already exists. Try logging in instead.");
            }

            // Request validation error (422)
            else if (error.response?.status === 422) {
                setError("Some information appears to be invalid. Please review your details and try again.");
            }

            // Fallback for unexpected errors
            else {
                setError("Something went wrong. Please try again.");
            }

        }
    }

    return (
        // Full-page container used for centering registration card
        <div className="registration-page">

            {/* Card container for login content and form */}
            <div className="registration-card">

                {/* Header section for login page title */}
                <div className="registration-header">
                    <h2 className="registration-title">Sign-up</h2>
                </div>

                {/* Registration form */}
                <form onSubmit={handleSubmit} className="registration-form">

                    {/* First Name input field */}
                    <div className="form-group">
                        <label className="required" htmlFor="firstName">First Name</label>
                        <input
                            id="firstName"
                            type="text"
                            value={firstName}

                            // Update first name state when user types
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>

                    {/* Last Name input field */}
                    <div className="form-group">
                        <label className="required" htmlFor="lastName">Last Name</label>
                        <input
                            id="lastName"
                            type="text"
                            value={lastName}

                            // Update first name state when user types
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>

                    {/* Middle Name input field - optional */}
                    <div className="form-group">
                        <label htmlFor="middleName">Middle Name(optional)</label>
                        <input
                            id="middleName"
                            type="text"
                            value={middleName}

                            // Update first name state when user types
                            onChange={(e) => setMiddleName(e.target.value)}
                        />
                    </div>


                    {/* Email input field */}
                    <div className="form-group">
                        <label className="required" htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={emailAddress}

                            // Update first name state when user types
                            onChange={(e) => setEmailAddress(e.target.value)}
                        />
                    </div>

                    {/* Phone numner input field - optional */}
                    <div className="form-group">
                        <label htmlFor="phone">Phone number (optional)</label>
                        <input
                            id="phone"
                            type="tel"
                            value={phoneNumber}

                            // Update first name state when user types
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>

                    {/* Password input field */}
                    <div className="form-group">
                        <label className="required" htmlFor="password">Password</label>

                        <input
                            id="password"
                            type="password"
                            autoComplete="new-password"
                            value={password}

                            // Update password state when user types
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>


                    {/* Confirm Password input field */}
                    <div className="form-group">
                        <label className="required" htmlFor="confirmPassword">Confirm password</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            autoComplete="new-password"
                            value={confirmPassword}

                            // Update confirm password state when user types
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    {/* Conditionally render authentication error message */}
                    {error && <p className="auth-error">{error}</p>}

                    {/* Submit login request */}
                    <button className="auth-button" type="submit">Sign-up</button>

                    {/* Provide link back to login page */}
                    <p className="auth-redirect">Already have an account?
                        <Link to="/" className="auth-link auth-link-center"> Login</Link>
                    </p>

                </form>
            </div>
        </div>


    );
}