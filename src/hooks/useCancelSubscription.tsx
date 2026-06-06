import { useMutation } from "@tanstack/react-query";
import { cancelSubscription as cancelSubApi } from "../services/userApi";


/* Define TanStack Query mutation hook that wraps the Axios /me/billing/plan api
call and returns a TSQ mutation object
*/
export function useCancelSubscription() {
    return useMutation({
        mutationFn: cancelSubApi,
    });
}
