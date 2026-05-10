import { useMutation } from "@tanstack/react-query";
import { register as registerApi } from "../services/authApi.ts"

/* Define TanStack Query mutation hook that takes user credentials,
calls the register API and returns a TSQ mutation object
*/
export function useRegister() {
    return useMutation({
        mutationFn: registerApi,
    });
}
