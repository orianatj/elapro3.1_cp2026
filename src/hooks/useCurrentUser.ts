import { useQuery } from "@tanstack/react-query";
import { currentUser } from "../services/userApi";

/* Define TanStack Query, Query hook to return token of (logged-in) authenticated user. Only run if a token exists (see 'enabled').
*/
export function useCurrentUser(queryKey: string[] = ["me"]) {
    return useQuery({
        queryKey: queryKey,
        queryFn: currentUser,
        enabled: !!sessionStorage.getItem("token")
    });

};
