import { getPaymentMethod as paymentMethodApi } from "../services/userApi";
import { useQuery } from "@tanstack/react-query";

export function usePaymentMethod() {
    return useQuery({
        queryKey: ["view-payment-method"],
        queryFn: paymentMethodApi
    });

};