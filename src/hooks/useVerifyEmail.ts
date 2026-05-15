import { useMutation } from "@tanstack/react-query";
import { verifyEmail as verifyEmailApi } from "../services/authApi.ts"

/* Define TanStack Query mutation hook that wraps the Axios /auth/verify-email api
call and returns a TSQ mutation object
*/
export function useVerifyEmail() {
    return useMutation({
        mutationFn: verifyEmailApi,
    });
}
