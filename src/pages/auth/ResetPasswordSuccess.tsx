import { useNavigate } from "react-router-dom";
import success from "../../assets/auth/success.png"



export function ResetPasswordSuccess() {

    const navigate = useNavigate();

    return (
        <div className="auth-page" >
            <div className="auth-card">
                <img className="auth-icon" src={success} alt="Reset password success icon" width={100} height={100} />
                <div className="auth-header">
                    <h2 className="auth-title">Password Changed!</h2>
                    <p className="auth-instruction">Your password has been successfully changed!</p>
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
    );
};