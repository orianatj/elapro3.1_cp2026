import { useCallback, useEffect, useState } from "react";
import {
  exportAdminLogs,
  getAdminLogs,
  type AdminLogCategory,
  type AdminLogItem,
  type AdminLogStatus,
} from "../services/adminApi";

export function useAdminReports() {
  const [logs, setLogs] = useState<AdminLogItem[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(25);
  const [total, setTotal] = useState<number | undefined>(undefined);

  const [searchText, setSearchText] = useState<string>("");
  const [logCategory, setLogCategory] = useState<AdminLogCategory | undefined>();
  const [logStatus, setLogStatus] = useState<AdminLogStatus | undefined>();

  const [loading, setLoading] = useState<boolean>(true);
  const [exporting, setExporting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReports = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await getAdminLogs({
        page,
        limit,
        dateRange: "30d",
        sortBy: "log_creation_date",
        sortOrder: "desc",
        logCategory,
        logStatus,
      });

      setLogs(result.logs);
      setTotal(result.total);
    } catch (err: any) {
      const status = err?.response?.status;

      if (status === 401) {
        setError("You are not logged in. Please log in again.");
      } else if (status === 403) {
        setError("You do not have admin permission to view reports.");
      } else {
        setError("Failed to load reports.");
      }
    } finally {
      setLoading(false);
    }
  }, [page, limit, logCategory, logStatus]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const handleExport = async () => {
    try {
      setExporting(true);
      setError(null);

      await exportAdminLogs({
        dateRange: "30d",
        sortBy: "log_creation_date",
        sortOrder: "desc",
        logCategory,
        logStatus,
      });
    } catch {
      setError("Failed to export reports.");
    } finally {
      setExporting(false);
    }
  };

  const filteredLogs = logs.filter((log) => {
    const query = searchText.toLowerCase();

    const searchableText = [
      log.logAction,
      log.logCategory,
      log.logStatus,
      log.emailAddress,
      log.firstName,
      log.lastName,
      log.targetUserEmail,
      log.targetUserFirstName,
      log.targetUserLastName,
      log.resourceType,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchableText.includes(query);
  });

  return {
    logs: filteredLogs,
    page,
    limit,
    total,
    loading,
    exporting,
    error,
    searchText,
    logCategory,
    logStatus,
    setSearchText,
    setLogCategory,
    setLogStatus,
    setPage,
    refetchReports: fetchReports,
    exportReports: handleExport,
  };
}