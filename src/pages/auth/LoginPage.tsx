import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import type { Credentials } from "../../types/common/Auth";
import Logo from "../../assets/Logo.png";

export default function LoginPage() {


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
        <div>
            <h1>Login</h1>
            <img src={Logo} alt="Image of React Logo" />
            <form className="login-form" onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && <p>{error}</p>}

                <button type="submit">Login</button>
            </form>
        </div>


    );
}