import { useNavigate } from "react-router-dom";
import passwordfailure from "../../assets/auth/passwordfailure.png";


export function InvalidResetLink() {

    const navigate = useNavigate();

    return (
        <div className="auth-page" >
            <div className="auth-card">
                <img className="auth-icon" src={passwordfailure} alt="Reset password failure icon" width={100} height={100} />
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
                >
                    Request a new reset link

                </button>
            </div>
        </div>
    );

};