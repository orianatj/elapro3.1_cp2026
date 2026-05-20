import { useMutation } from "@tanstack/react-query";
import { resendVerify as resendVerifyApi } from "../services/authApi";

/* Define a TanStack Query mutation hook that wraps the Axios /auth/reset-password call and returns a TSQ mutation object
*/
export function useResendVerify() {
    return useMutation({
        mutationFn: resendVerifyApi,
    });
}