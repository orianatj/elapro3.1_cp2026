import { useMutation } from "@tanstack/react-query";
import { forgotPassword as forgotPasswordApi } from "../services/authApi";

/* Define a TanStack Query mutation hook that wraps the Axios /auth/forgot-password call and returns a TSQ mutation object
*/
export function useForgotPassword() {
    return useMutation({
        mutationFn: forgotPasswordApi,
    });
}