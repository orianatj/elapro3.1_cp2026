import { viewSubscription as viewSubApi } from "../services/userApi";
import { useQuery } from "@tanstack/react-query";

export function useViewSubscription() {
    return useQuery({
        queryKey: ["view-subscription"],
        queryFn: viewSubApi
    });

};
