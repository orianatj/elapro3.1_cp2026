import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import type { Credentials } from "../../types/common/Auth";
import Logo from "../../assets/Logo.png";
import "./authpages.css"
//import { Link } from "react-router-dom";

export function LoginPage() {


    // Extract login function from auth context
    const { login } = useAuth();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    // Handles login form submission
    async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {

        // Prevent browser from performing default page refresh on form submit
        event.preventDefault();

        // Clear previous error before new submission
        setError("");

        // Construct credentials object from controlled form input state
        const credentials: Credentials = {
            emailAddress: email,
            password: password,
        };

        // Only allow form submission if fields are populated
        if (!email || !password) {
            setError("Please enter your email and password.")
            return
        }

        try {

            // Attempt authentication request using AuthContext login function
            await login(credentials);

            // Rest form fields on success
            setEmail("");
            setPassword("");

        } catch (error: any) {

            // Display user-friendly error message for invalid login credentials
            if (error.response?.status === 401) {
                setError("Invalid email or password");
            }

            // No account exists for the provided email 
            else if (error.response?.status === 404) {
                setError("It looks like you don't have an account yet. Sign up to get started.")
            }

            // Missing or invalid field-level data for email and/or passowrd
            else if (error.response?.status === 422) {
                setError("Please enter a valid email and password");
            }

            // Fallback for unexpected errors
            else {
                setError("Something went wrong. Please try again.");
            }

        }

    }

    return (
        // Full-page container used for centering login card
        <div className="login-page">

            {/* Card container for login content and form */}
            <div className="login-card">

                {/* Application logo */}
                <img className="login-logo" src={Logo} alt="React Logo" />

                {/* Header section for login page title */}
                <div className="login-header">
                    <h2 className="login-title">Login</h2>
                </div>

                {/* Login form */}
                <form onSubmit={handleSubmit} className="login-form">
                    {/* Email input field */}
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}

                            // Update email state when user types
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Password input field */}
                    <div className="form-group">
                        <label htmlFor="password">Password</label>

                        <input
                            id="password"
                            type="password"
                            autoComplete="new-password"
                            value={password}

                            // Update password state when user types
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* Conditionally render authentication error message */}
                    {error && <p className="auth-error">{error}</p>}

                    {/* Submit login request */}
                    <button className="auth-button" type="submit">Login</button>

                    {/* TODO: Add interactable link to Sign-up page once created*/}

                    {/*<p><Link to="/"></Link>Sign-up</p>*/}

                </form>
            </div>
        </div>


    );
}