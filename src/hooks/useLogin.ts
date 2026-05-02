import { login as loginApi } from "../services/authApi.ts";
import { useMutation } from "@tanstack/react-query";

/* Define TanStack Query mutation hook that takes user credentials,
calls the login API and returns the result (token), tracks loading & error state
*/
export function useLogin() {
    return useMutation({
        mutationFn: loginApi,
    });
}
