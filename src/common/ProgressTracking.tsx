// src/components/ProgressTracking.tsx

import React, { useMemo, useState } from "react";
import {
  useDashboardProgressTracking,
} from "../hooks/useDashboardProgressTracking";

import "../pages/teacher/SubmissionProgressChart.css";

type Props = {
  defaultUserId?: string;
};

export default function DashboardProgressTracking({
  defaultUserId,
}: Props) {
  const [userId, setUserId] = useState(defaultUserId || "");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [ieltsType, setIeltsType] = useState("");
  const [taskType, setTaskType] = useState("");

  const params = useMemo(
    () => ({
      userId: userId || null,
      fromDate: fromDate || null,
      toDate: toDate || null,
      ieltsType: ieltsType || null,
      taskType: taskType || null,
    }),
    [userId, fromDate, toDate, ieltsType, taskType]
  );

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useDashboardProgressTracking(params);

  const summary = data?.summary;
  const timeline = data?.timeline || [];
  const breakdown = data?.breakdown || [];

  return (
    <div className="dashboard-progress-page">
      <div className="dashboard-progress-header">
        <div>
          <h2>Dashboard Progress Tracking</h2>
          <p>
            Track IELTS progress by submission date, module type,
            and task type.
          </p>
        </div>

        <button
          className="dashboard-refresh-btn"
          onClick={() => refetch()}
          disabled={isFetching}
        >
          {isFetching ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <div className="dashboard-filters-card">
        <div className="dashboard-filter-grid">
          <label>
            User ID
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Optional user id"
            />
          </label>

          <label>
            From Date
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </label>

          <label>
            To Date
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </label>

          <label>
            IELTS Type
            <select
              value={ieltsType}
              onChange={(e) => setIeltsType(e.target.value)}
            >
              <option value="">All</option>
              <option value="academic">Academic</option>
              <option value="general_training">
                General Training
              </option>
            </select>
          </label>

          <label>
            Task Type
            <select
              value={taskType}
              onChange={(e) => setTaskType(e.target.value)}
            >
              <option value="">All</option>
              <option value="task_1">Task 1</option>
              <option value="task_2">Task 2</option>
            </select>
          </label>
        </div>
      </div>

      {isLoading ? (
        <div className="dashboard-state-card">
          Loading dashboard progress...
        </div>
      ) : isError ? (
        <div className="dashboard-state-card dashboard-error-card">
          Failed to load dashboard progress.
          <div className="dashboard-error-text">
            {error instanceof Error
              ? error.message
              : "Unknown error"}
          </div>
        </div>
      ) : (
        <>
          <div className="dashboard-summary-grid">
            <div className="dashboard-summary-card">
              <span>Total Submissions</span>
              <strong>
                {summary?.totalSubmissions ?? 0}
              </strong>
            </div>

            <div className="dashboard-summary-card">
              <span>Completed Tasks</span>
              <strong>
                {summary?.completedTasks ?? 0}
              </strong>
            </div>

            <div className="dashboard-summary-card">
              <span>Average Score</span>
              <strong>{summary?.avgScore ?? 0}</strong>
            </div>

            <div className="dashboard-summary-card">
              <span>Streak Days</span>
              <strong>{summary?.streakDays ?? 0}</strong>
            </div>
          </div>

          <div className="dashboard-content-grid">
            <section className="dashboard-panel">
              <div className="dashboard-panel-title">
                <h3>Progress Timeline</h3>
              </div>

              {timeline.length === 0 ? (
                <div className="dashboard-empty-state">
                  No timeline data found.
                </div>
              ) : (
                <div className="dashboard-timeline">
                  {timeline.map((item, index) => {
                    const percentage =
                      item.percentage ??
                      (item.total > 0
                        ? Math.round(
                            (item.completed / item.total) * 100
                          )
                        : 0);

                    return (
                      <div
                        className="dashboard-timeline-item"
                        key={`${item.label}-${index}`}
                      >
                        <div className="dashboard-timeline-row">
                          <div>
                            <div className="dashboard-timeline-label">
                              {item.label}
                            </div>

                            {item.date ? (
                              <div className="dashboard-timeline-date">
                                {item.date}
                              </div>
                            ) : null}
                          </div>

                          <div className="dashboard-timeline-metrics">
                            {item.completed}/{item.total} •{" "}
                            {percentage}%
                          </div>
                        </div>

                        <div className="dashboard-progress-bar">
                          <div
                            className="dashboard-progress-fill"
                            style={{
                              width: `${percentage}%`,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            <section className="dashboard-panel">
              <div className="dashboard-panel-title">
                <h3>Breakdown</h3>
              </div>

              {breakdown.length === 0 ? (
                <div className="dashboard-empty-state">
                  No breakdown available.
                </div>
              ) : (
                <div className="dashboard-breakdown-list">
                  {breakdown.map((row, index) => (
                    <div
                      className="dashboard-breakdown-item"
                      key={`${row.name}-${index}`}
                    >
                      <div className="dashboard-breakdown-top">
                        <span>{row.name}</span>
                        <strong>{row.count}</strong>
                      </div>

                      <div className="dashboard-progress-bar small">
                        <div
                          className="dashboard-progress-fill"
                          style={{
                            width: `${row.percentage ?? 0}%`,
                          }}
                        />
                      </div>

                      <div className="dashboard-breakdown-percent">
                        {row.percentage ?? 0}%
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </>
      )}
    </div>
  );
}