import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPaymentMethod as addPaymentApi } from "../services/userApi";


/* Define TanStack Query mutation hook that wraps the Axios /me/billing/payment-method api call and returns a TSQ mutation object
*/
export function useAddPaymentMethod() {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addPaymentApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["view-payment-method"] })
        }
    });
}
