import { getBillingHistory as billingHistApi } from "../services/userApi";
import type { BillingHistoryQuery } from "../types/common/billing";
import { useQuery } from "@tanstack/react-query";

export function useBillingHistory(params: BillingHistoryQuery) {
    return useQuery({
        queryKey: ["view-billing-history", params],
        queryFn: () => billingHistApi(params)
    });

};
