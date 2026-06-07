import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deletePaymentMethod as deletePaymentApi } from "../services/userApi";


/* Define TanStack Query mutation hook that wraps the Axios /me/billing/payment-method api call and returns a TSQ mutation object
*/
export function useDeletePaymentMethod() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deletePaymentApi,
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["view-payment-method"], }) },
    });
}
