import { useNavigate } from "react-router-dom";
import success from "../../assets/auth/success.png";

export function VerifyEmailSuccess() {

    const navigate = useNavigate();

    return (
        <div className="auth-page" >
            <div className="auth-card">
                <img className="auth-icon" src={success} alt="Account verified success icon" width={100} height={100} />
                <div className="auth-header">
                    <h2 className="auth-title">Email Verified</h2>
                    <p className="auth-instruction">Your email has been successfully verified. You can now login to your account!</p>
                </div>

                <button
                    className="auth-button"
                    type="button"
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    Proceed to login

                </button>
            </div>
        </div>
    )
}