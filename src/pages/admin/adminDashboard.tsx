import React from "react";
import "./adminDashboard.css";

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

const recentActivities = [
  "New teacher account created",
  "Student subscription updated",
  "IELTS report generated",
  "Pending user verification reviewed",
];

const systemUpdates = [
  {
    label: "Platform Status",
    value: "Operational",
  },
  {
    label: "Last Sync",
    value: "10:42 AM",
  },
  {
    label: "Active Sessions",
    value: "24 users online",
  },
];

export function AdminDashboardPage() {
  return (
    <div className="admin-dashboard-page">
      <section className="admin-header">
        <h1>Hi, User Name</h1>
        <p>Welcome back to the ELA Pro admin dashboard.</p>
      </section>

      <section className="admin-stats">
        <AdminStatCard
          title="Total Users"
          value="8"
          description="Registered platform users"
        />

        <AdminStatCard
          title="Active Subscriptions"
          value="3"
          description="Current paid users"
        />

        <AdminStatCard
          title="Reports Generated"
          value="2"
          description="Reports created this week"
        />
      </section>

      <section className="admin-content-grid">
        <div className="admin-panel">
          <div className="admin-panel-header">
            <h2>Recent Activity</h2>
            <button>View All</button>
          </div>

          <ul className="admin-activity-list">
            {recentActivities.map((activity, index) => (
              <li key={activity}>
                <span>[{index + 1}]</span>
                <p>{activity}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="admin-panel">
          <div className="admin-panel-header">
            <h2>System Status</h2>
            <button>Refresh</button>
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