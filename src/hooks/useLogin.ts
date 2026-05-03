import { login as loginApi } from "../services/authApi.ts";
import { useMutation } from "@tanstack/react-query";

/* Define TanStack Query mutation hook that takes user credentials,
calls the login API and returns a TSQ mutation object
*/
export function useLogin() {
    return useMutation({
        mutationFn: loginApi,
    });
}
