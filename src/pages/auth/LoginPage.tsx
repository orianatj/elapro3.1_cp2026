import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import type { Credentials } from "../../types/common/Auth";
import Logo from "../../assets/Logo.png";
import "./authpages.css"

export function LoginPage() {


    // Extract login function from auth context
    const { login } = useAuth();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {

        event.preventDefault();

        const credentials: Credentials = {
            emailAddress: email,
            password: password,
        };

        try {
            await login(credentials);
        } catch (error: any) {
            if (error.response?.status === 401) {
                setError("Invalid email or password");
            }
        }

    }

    return (
        <div className="login-page">
            <div className="login-card">
                <img className="login-logo" src={Logo} alt="React Logo" />
                <div className="login-header">
                    <h2 className="login-title">Login</h2>
                </div>
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && <p>{error}</p>}

                    <button type="submit">Login</button>

                </form>
            </div>
        </div>


    );
}