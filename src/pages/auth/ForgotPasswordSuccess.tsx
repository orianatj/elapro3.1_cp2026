import type { ForgotPassword } from "../../types/common/Auth";
import letter from "../../assets/auth/letter.png";


type ForgotPwProps = {
    email: ForgotPassword["emailAddress"];
}

export function ForgotPasswordSuccess({ email }: ForgotPwProps) {

    return (

        <div className="auth-page">
            <div className="auth-card">
                <img className="auth-icon" src={letter} alt="Sent email icon" width={150} height={150} />
                <div className="auth-header">
                    <h2 className="auth-title">Check your email!</h2>
                    <p className="auth-instruction">We've sent a password reset link to {email}.</p>
                </div>
            </div>
        </div>
    )
}