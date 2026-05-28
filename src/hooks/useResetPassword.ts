import { useMutation } from "@tanstack/react-query";
import { resetPassword as resetPasswordApi } from "../services/authApi";

/* Define a TanStack Query mutation hook that wraps the Axios /auth/reset-password call and returns a TSQ mutation object
*/
export function useResetPassword() {
    return useMutation({
        mutationFn: resetPasswordApi,
    });
}