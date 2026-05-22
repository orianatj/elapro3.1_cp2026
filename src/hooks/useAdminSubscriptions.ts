import { useCallback, useEffect, useState } from "react";
import {
  getAdminSubscriptions,
  type AdminSubscriptionItem,
  type AdminSubscriptionQuery,
} from "../services/adminApi";

export function useAdminSubscriptions(initialQuery: AdminSubscriptionQuery = {}) {
  const [subscriptions, setSubscriptions] = useState<AdminSubscriptionItem[]>([]);
  const [page, setPage] = useState<number>(initialQuery.page ?? 1);
  const [limit] = useState<number>(initialQuery.limit ?? 25);
  const [total, setTotal] = useState<number | undefined>(undefined);

  const [searchText, setSearchText] = useState<string>("");
  const [billingStatus, setBillingStatus] = useState<
    AdminSubscriptionQuery["billing_status"] | undefined
  >(initialQuery.billing_status);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubscriptions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await getAdminSubscriptions({
        ...initialQuery,
        page,
        limit,
        billing_status: billingStatus,
      });

      setSubscriptions(result.subscriptions);
      setTotal(result.total);
    } catch (err: any) {
      const status = err?.response?.status;

      if (status === 401) {
        setError("You are not logged in. Please log in again.");
      } else if (status === 403) {
        setError("You do not have admin permission to view subscriptions.");
      } else {
        setError("Failed to load subscription data.");
      }
    } finally {
      setLoading(false);
    }
  }, [initialQuery, page, limit, billingStatus]);

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  const filteredSubscriptions = subscriptions.filter((item) => {
    const fullName = `${item.firstName ?? ""} ${item.lastName ?? ""}`.toLowerCase();
    const email = item.emailAddress?.toLowerCase() ?? "";
    const query = searchText.toLowerCase();

    return fullName.includes(query) || email.includes(query);
  });

  return {
    subscriptions: filteredSubscriptions,
    page,
    limit,
    total,
    loading,
    error,
    searchText,
    billingStatus,
    setSearchText,
    setBillingStatus,
    setPage,
    refetchSubscriptions: fetchSubscriptions,
  };
}