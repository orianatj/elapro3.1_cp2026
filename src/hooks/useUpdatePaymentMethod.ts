import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updatePaymentMethod as updatePaymentApi } from "../services/userApi";


/* Define TanStack Query mutation hook that wraps the Axios /me/billing/payment-method api call and returns a TSQ mutation object
*/
export function useUpdatePaymentMethod() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updatePaymentApi,
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["view-payment-method"], }) },
    });
}
