import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useVerifyEmail } from "../../hooks/useVerifyEmail";
import { VerifyEmailSuccess } from "./VerifyEmailSuccess";
import { InvalidVerificationLink } from "./InvalidVerificationLink";
import { VerifyEmailLoading } from "./VerifyEmailLoading";

export function VerifyEmailPage() {

    const [searchParams] = useSearchParams();

    // Store token extracted from URL
    const token = searchParams.get("token");

    // Create the mutation object
    const verifyEmailMutation = useVerifyEmail();

    // Call /verify-email endpoint to verify email when the component mounts. Dependency array [token]: run useEffect whenever the token changes 
    useEffect(() => {

        // Check a token exists 
        if (!token) {
            return;
        }

        // Call mutation method with token
        verifyEmailMutation.mutate({ token });
    }, [token]);

    // If there is no token display this UI component
    if (!token) {
        return <div className="auth-page"><InvalidVerificationLink /></div>
    }

    // Whilst the verification is occuring, display a loading UI
    if (verifyEmailMutation.isPending) {

        return <VerifyEmailLoading />

    }

    // If the token is invalid (expired/used) display this UI component 
    if (verifyEmailMutation.isError) {

        return <InvalidVerificationLink />
    }

    // If the token is validated display this UI component 

    if (verifyEmailMutation.isSuccess) {

        return <VerifyEmailSuccess />
    }


};