import { useMutation } from "@tanstack/react-query";
import { updateSubscription as updateSubApi } from "../services/userApi";


/* Define TanStack Query mutation hook that wraps the Axios /me/billing/plan api
call and returns a TSQ mutation object
*/
export function useUpdateSubscription() {
    return useMutation({
        mutationFn: updateSubApi,
    });
}
