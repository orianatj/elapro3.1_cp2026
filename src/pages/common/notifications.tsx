import { useState } from "react";
import "./Notifications.css";
import { useNotifications } from "../../hooks/useNotifications";
import { useUpdateNotification } from "../../hooks/useUpdateNotification";

type NotificationItem = {
  notificationId: string;
  userId?: string;
  submissionId?: string;
  read?: boolean;
  type?: string;
  message?: string;
  createdAt?: string;
  [key: string]: any;
};

type Pagination = {
  total?: number;
  total_pages?: number;
  limit?: number;
  page?: number;
};

function getItems(data: any): NotificationItem[] {
  return data?.data?.items ?? data?.data?.data?.items ?? data?.items ?? [];
}

function getPagination(data: any): Pagination | undefined {
  return data?.data?.pagination ?? data?.pagination;
}

/**
 * Generates pagination numbers like:
 * 1 ... 4 5 6 7 8 ... 20
 */
function getPageNumbers(current: number, total: number) {
  const delta = 2;
  const range: (number | string)[] = [];

  const left = Math.max(1, current - delta);
  const right = Math.min(total, current + delta);

  for (let i = left; i <= right; i++) {
    range.push(i);
  }

  if (left > 1) {
    range.unshift("...");
    range.unshift(1);
  }

  if (right < total) {
    range.push("...");
    range.push(total);
  }

  return range;
}

const Notifications = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useNotifications(page);
  const updateNotification = useUpdateNotification();

  const notifications = getItems(data);
  const pagination = getPagination(data);

  const total = pagination?.total ?? 0;
  const totalPages = pagination?.total_pages ?? 1;
  const currentPage = pagination?.page ?? page;

  const handleRead = (notificationId: string) => {
    updateNotification.mutate(notificationId);
  };

  const startItem =
    notifications.length > 0
      ? (currentPage - 1) * (pagination?.limit ?? 10) + 1
      : 0;

  const endItem = notifications.length > 0 ? startItem + notifications.length - 1 : 0;

  if (isLoading) {
    return <div className="notifications-loading">Loading...</div>;
  }

  return (
    <div className="notifications-page">
      <div className="notification-container">
        <div className="notification-header">
          <span>Notification List</span>
          <span>Total: {total}</span>
        </div>

        <div className="notification-list">
          {notifications.length === 0 ? (
            <div className="notifications-empty">No notifications available.</div>
          ) : (
            notifications.map((item) => {
              const read = Boolean(item.read);

              return (
                <div key={item.notificationId} className="notification-item">
                  <div className={`status-dot ${read ? "read-dot" : "unread-dot"}`} />

                  <div className="notification-icon">📄</div>

                  <div className="notification-content">
                    <h4>{item.type ?? "Notification"}</h4>
                    <p>{item.message ?? "No message available."}</p>
                  </div>

                  <div className="notification-date">
                    {item.createdAt ? new Date(item.createdAt).toLocaleString() : "-"}
                  </div>

                  <button
                    className={`notification-btn ${read ? "read-btn" : "unread-btn"}`}
                    disabled={read || updateNotification.isPending}
                    onClick={() => handleRead(item.notificationId)}
                  >
                    {read ? "Read" : updateNotification.isPending ? "Updating..." : "Mark as read"}
                  </button>
                </div>
              );
            })
          )}
        </div>

        <div className="pagination-section">
          <button disabled={page <= 1} onClick={() => setPage(1)}>
            «
          </button>

          <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
            ‹
          </button>

          {getPageNumbers(currentPage, totalPages).map((p, idx) => {
            if (p === "...") {
              return (
                <span key={`dots-${idx}`} className="pagination-dots">
                  ...
                </span>
              );
            }

            return (
              <button
                key={p}
                className={p === currentPage ? "active-page" : ""}
                onClick={() => setPage(Number(p))}
              >
                {p}
              </button>
            );
          })}

          <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
            ›
          </button>

          <button disabled={page >= totalPages} onClick={() => setPage(totalPages)}>
            »
          </button>

          <span className="pagination-info">
            Showing {startItem} to {endItem} of {total}
          </span>
        </div>

        <div className="legend">
          <span>
            <span className="legend-dot unread-dot"></span>
            Unread
          </span>

          <span>
            <span className="legend-dot read-dot"></span>
            Read
          </span>
        </div>
      </div>
    </div>
  );
};

export default Notifications;