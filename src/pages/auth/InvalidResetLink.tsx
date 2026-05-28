import { useNavigate } from "react-router-dom";
import failure from "../../assets/auth/failure.png";


export function InvalidResetLink() {

    const navigate = useNavigate();

    return (
        <div className="auth-page" >
            <div className="auth-card">
                <img className="auth-icon" src={failure} alt="Reset password link expired icon" width={100} height={100} />
                <div className="auth-header">
                    <h2 className="auth-title">Password Reset Link Expired</h2>
                    <p className="auth-instruction">Your password reset link is invalid or has expired.</p>
                </div>

                <button
                    className="auth-button"
                    type="button"
                    onClick={() => {
                        navigate("/forgot-password");
                    }}
                >Request a new reset link

                </button>
            </div>
        </div>
    );

};