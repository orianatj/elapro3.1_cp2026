import React, { useMemo } from "react";
import "./adminDashboard.css";
import { useAdminSubscriptions } from "../../hooks/useAdminSubscriptions";
import type { AdminSubscriptionItem } from "../../services/adminApi";

function formatUserName(item: AdminSubscriptionItem): string {
  const fullName = `${item.firstName ?? ""} ${item.lastName ?? ""}`.trim();

  if (fullName) {
    return fullName;
  }

  return item.emailAddress || "Unknown user";
}

function formatPlan(item: AdminSubscriptionItem): string {
  return item.planName || item.billingPlan || "Not assigned";
}

function formatStatus(item: AdminSubscriptionItem): string {
  return item.subscriptionStatus || item.billingStatus || "Unknown";
}

function formatUsage(item: AdminSubscriptionItem): string {
  const used = item.submissionsUsed ?? 0;
  const quota = item.submissionQuota ?? 0;

  if (!quota) {
    return "Not provided";
  }

  return `${used} / ${quota} submissions`;
}

function formatDate(dateValue?: string | null): string {
  if (!dateValue) {
    return "—";
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "2-digit",
  });
}

export function AdminSubscriptionsPage() {
  const subscriptionQuery = useMemo(
    () => ({
      date_range: "30d" as const,
      sort_by: "nextBillingDate" as const,
      sort_order: "desc" as const,
      limit: 25,
      page: 1,
    }),
    []
  );

  const {
    subscriptions,
    page,
    loading,
    error,
    searchText,
    billingStatus,
    setSearchText,
    setBillingStatus,
    setPage,
    refetchSubscriptions,
  } = useAdminSubscriptions(subscriptionQuery);

  if (loading) {
    return (
      <div className="admin-dashboard-page">
        <section className="admin-header">
          <h1>Subscriptions</h1>
          <p>Loading subscription data...</p>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard-page">
        <section className="admin-header">
          <h1>Subscriptions</h1>
          <p>{error}</p>
          <button type="button" onClick={refetchSubscriptions}>
            Try Again
          </button>
        </section>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-page">
      <section className="admin-header">
        <h1>Subscriptions</h1>
        <p>Home &gt; Subscriptions</p>
      </section>

      <section className="admin-panel">
        <div className="admin-subscription-toolbar">
          <input
            type="text"
            placeholder="Search user or email"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />

          <select
            value={billingStatus ?? ""}
            onChange={(event) =>
              setBillingStatus(
                event.target.value
                  ? (event.target.value as
                      | "pending"
                      | "paid"
                      | "failed"
                      | "refunded")
                  : undefined
              )
            }
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>

          <button type="button" onClick={refetchSubscriptions}>
            Refresh
          </button>
        </div>

        <table className="admin-subscription-table">
          <thead>
            <tr>
              <th>User / Organisation</th>
              <th>Plan</th>
              <th>Status</th>
              <th>Usage</th>
              <th>Renewal Date</th>
              <th>Last Updated</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {subscriptions.length > 0 ? (
              subscriptions.map((item, index) => (
                <tr key={item.userId || item.emailAddress || index}>
                  <td>{formatUserName(item)}</td>
                  <td>{formatPlan(item)}</td>
                  <td>{formatStatus(item)}</td>
                  <td>{formatUsage(item)}</td>
                  <td>
                    {formatDate(
                      item.nextBillingDate ||
                        item.renewalDate ||
                        item.periodEnd
                    )}
                  </td>
                  <td>{formatDate(item.lastUpdated || item.updatedAt)}</td>
                  <td>
                    <button type="button" className="admin-table-link-button">
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>No subscription records found.</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="admin-pagination">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
          >
            « Prev
          </button>

          <span>Page {page}</span>

          <button type="button" onClick={() => setPage(page + 1)}>
            Next »
          </button>
        </div>
      </section>
    </div>
  );
}