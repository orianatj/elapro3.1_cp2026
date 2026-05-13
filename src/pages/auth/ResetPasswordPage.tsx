import { useState } from "react";
import { ResetPasswordForm } from "./ResetPasswordForm";
import { ResetPasswordSuccess } from "./ResetPasswordSuccess";
import { InvalidResetLink } from "./InvalidResetLink";
import { useSearchParams } from "react-router-dom";

export function ResetPasswordPage() {

    const [isSuccess, setSuccess] = useState(false);

    const [isInvalidToken, setInvalid] = useState(false);

    const [searchParams] = useSearchParams();

    const token = searchParams.get("token");

    if (!token) {
        return <InvalidResetLink />
    }

    if (isInvalidToken) {
        return <InvalidResetLink />
    }

    if (isSuccess) {
        return <ResetPasswordSuccess />
    }

    return (
        <div className="auth-page">

            <ResetPasswordForm

                token={token}

                onSuccess={() => {
                    setSuccess(true);
                }}

                onInvalidToken={() => {
                    setInvalid(true);
                }}

            />

        </div>
    )


};