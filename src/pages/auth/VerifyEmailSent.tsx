import type { Registration } from "../../types/common/Auth";
import letter from "../../assets/auth/letter.png"
import { Link } from "react-router-dom";

type VerifyEmailProps = {
    email: Registration["emailAddress"];
    onResendRequested: () => void;
}
export function VerifyEmailSent({ email, onResendRequested }: VerifyEmailProps) {

    return (
        <div className="auth-page" >
            <div className="auth-card">
                <img className="auth-icon" src={letter} alt="Verification email sent icon" width={100} height={100} />
                <div className="auth-header">
                    <h2 className="auth-title">Verify your email</h2>
                    <p className="auth-instruction">We've sent an email to {email}. Click the verification link in the email to activate your account.</p>
                </div>

                <p className="auth-redirect">Didn't recieve an email?{" "}

                    <button
                        className="auth-link-button"
                        type="button"
                        onClick={onResendRequested}
                    >Resend verification email
                    </button>

                </p>


                <p className="auth-redirect-secondary">Already have an account?{" "}
                    <Link to="/" className="auth-link-secondary">Login</Link>
                </p>

            </div>
        </div>
    )
}