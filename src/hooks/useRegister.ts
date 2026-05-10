import { useMutation } from "@tanstack/react-query";
import { register as registerApi } from "../services/authApi.ts"

/* Define TanStack Query mutation hook that wraps the Axios /auth/register api
call and returns a TSQ mutation object
*/
export function useRegister() {
    return useMutation({
        mutationFn: registerApi,
    });
}
