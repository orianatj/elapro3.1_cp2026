import type { ForgotPassword } from "../../types/common/Auth";
import letter from "../../assets/auth/letter.png";


type ForgotPwProps = {
    email: ForgotPassword["emailAddress"];
}

export function ForgotPasswordSuccess({ email }: ForgotPwProps) {

    return (

        <div className="forgot-password-page">
            <div className="forgot-password-card">
                <img className="sent-email-icon" src={letter} alt="Sent email icon" width={150} height={150} />
                <div className="forgot-password-header">
                    <h2 className="forgot-password-title">Check your email!</h2>
                    <p className="forgot-password-instruction">We've sent a password reset link to {email}.</p>
                </div>
            </div>
        </div>
    )
}