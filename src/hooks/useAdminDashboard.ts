import { useCallback, useEffect, useState } from "react";
import {
  getAdminDashboard,
  type AdminDashboardData,
} from "../services/adminApi";

export function useAdminDashboard() {
  const [dashboardData, setDashboardData] =
    useState<AdminDashboardData | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getAdminDashboard();
      setDashboardData(data);
    } catch (err: any) {
      const status = err?.response?.status;

      if (status === 401) {
        setError("You are not logged in. Please log in again.");
      } else if (status === 403) {
        setError("You do not have admin permission to view this dashboard.");
      } else {
        setError("Failed to load admin dashboard data.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    dashboardData,
    loading,
    error,
    refetchDashboard: fetchDashboard,
  };
}