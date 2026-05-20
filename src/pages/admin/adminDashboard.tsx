import React from "react";
import "./adminDashboard.css";
import { useAdminDashboard } from "../../hooks/useAdminDashboard";
import type { RecentAdminActivity } from "../../services/adminApi";

type AdminStatCardProps = {
  title: string;
  value: string;
  description: string;
};

function AdminStatCard({ title, value, description }: AdminStatCardProps) {
  return (
    <div className="admin-stat-card">
      <p>{title}</p>
      <strong>{value}</strong>
      <span>{description}</span>
    </div>
  );
}

function formatActivity(activity: RecentAdminActivity): string {
  if (typeof activity === "string") {
    return activity;
  }

  return (
    activity.message ||
    activity.action ||
    activity.description ||
    "Recent admin activity"
  );
}

export function AdminDashboardPage() {
  const {
    dashboardData,
    loading,
    error,
    refetchDashboard,
  } = useAdminDashboard();

  const recentActivities =
    dashboardData?.recentUserActicty ||
    dashboardData?.recentUserActivity ||
    [];

  const systemUpdates = [
    {
      label: "Platform Status",
      value: dashboardData?.systemHealth || "Unknown",
    },
    {
      label: "Last Sync",
      value: loading ? "Loading..." : new Date().toLocaleTimeString(),
    },
    {
      label: "Active Sessions",
      value: "Not provided by API",
    },
  ];

  if (loading) {
    return (
      <div className="admin-dashboard-page">
        <section className="admin-header">
          <h1>Admin Dashboard</h1>
          <p>Loading dashboard data...</p>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard-page">
        <section className="admin-header">
          <h1>Admin Dashboard</h1>
          <p>{error}</p>
          <button type="button" onClick={refetchDashboard}>
            Try Again
          </button>
        </section>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-page">
      <section className="admin-header">
        <h1>Hi, Admin</h1>
        <p>Welcome back to the ELA Pro admin dashboard.</p>
      </section>

      <section className="admin-stats">
        <AdminStatCard
          title="Total Users"
          value={String(dashboardData?.totalUsers ?? 0)}
          description="Registered platform users"
        />

        <AdminStatCard
          title="Active Subscriptions"
          value={String(dashboardData?.activeSubscriptions ?? 0)}
          description="Current paid users"
        />

        <AdminStatCard
          title="System Health"
          value={dashboardData?.systemHealth || "Unknown"}
          description="Current backend status"
        />
      </section>

      <section className="admin-content-grid">
        <div className="admin-panel">
          <div className="admin-panel-header">
            <h2>Recent Activity</h2>
            <button type="button">View All</button>
          </div>

          <ul className="admin-activity-list">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity, index) => (
                <li key={index}>
                  <span>[{index + 1}]</span>
                  <p>{formatActivity(activity)}</p>
                </li>
              ))
            ) : (
              <li>
                <span>[0]</span>
                <p>No recent activity found.</p>
              </li>
            )}
          </ul>
        </div>

        <div className="admin-panel">
          <div className="admin-panel-header">
            <h2>System Status</h2>
            <button type="button" onClick={refetchDashboard}>
              Refresh
            </button>
          </div>

          <div className="admin-status-list">
            {systemUpdates.map((item) => (
              <div className="admin-status-row" key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}