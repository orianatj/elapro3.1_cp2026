import pending from "../../assets/auth/pending.png";


export function VerifyEmailLoading() {
    return (
        <div className="auth-page" >
            <div className="auth-card">
                <img className="auth-icon" src={pending} alt="Email verification loading icon" width={100} height={100} />
                <div className="auth-header">
                    <h2 className="auth-title">Verifying your email...</h2>
                </div>
            </div>
        </div>
    )
}