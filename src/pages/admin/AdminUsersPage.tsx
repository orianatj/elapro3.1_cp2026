import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import "./AdminUsersPage.css";
import { useAdminUsers } from "../../hooks/useAdminUsers";

import type {
  AdminDateRange,
  AdminUserItem,
  AdminUserRole,
  AdminUserStatus,
  CreateAdminUserPayload,
  UpdateAdminUserPayload,
} from "../../services/adminApi";
type ModalMode = "none" | "add" | "view" | "edit" | "delete";
type ViewMode = "table" | "cards";

const roleOptions: { label: string; value: AdminUserRole }[] = [
  { label: "Student", value: "student" },
  { label: "Supervisory Teacher", value: "supervisory_teacher" },
  { label: "External Teacher", value: "external_teacher" },
  { label: "Admin", value: "admin" },
];

const statusOptions: { label: string; value: AdminUserStatus }[] = [
  { label: "Pending", value: "pending" },
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "Suspended", value: "suspended" },
  { label: "Locked", value: "locked" },
  { label: "Pending Deletion", value: "pending_deletion" },
  { label: "Deleted", value: "deleted" },
];

const dateRangeOptions: { label: string; value: AdminDateRange }[] = [
  { label: "All", value: "all" },
  { label: "Last 7 days", value: "7d" },
  { label: "Last 30 days", value: "30d" },
  { label: "Last 90 days", value: "90d" },
  { label: "Last 6 months", value: "6m" },
  { label: "Last 1 year", value: "1y" },
  { label: "Last 3 years", value: "3y" },
];

const emptyUserForm: CreateAdminUserPayload = {
  firstName: "",
  middleName: "",
  lastName: "",
  emailAddress: "",
  phoneNumber: "",
  userRole: "student",
};

function getFullName(user: AdminUserItem) {
  return [user.firstName, user.middleName, user.lastName]
    .filter(Boolean)
    .join(" ");
}

function formatRole(role: AdminUserRole) {
  const roleMap: Record<AdminUserRole, string> = {
    admin: "Admin",
    student: "Student",
    supervisory_teacher: "Supervisory Teacher",
    external_teacher: "External Teacher",
  };

  return roleMap[role];
}

function formatStatus(status: AdminUserStatus) {
  return status
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function formatDate(value?: string | null) {
  if (!value) {
    return "-";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "2-digit",
  });
}

export default function AdminUsersPage() {
  const {
    users,
    selectedUser,
    query,
    total,
    loading,
    actionLoading,
    error,
    setQuery,
    setSelectedUser,
    viewUser,
    addUser,
    editUser,
    removeUser,
    exportUsers,
  } = useAdminUsers();

  const [modalMode, setModalMode] = useState<ModalMode>("none");
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [showFilters, setShowFilters] = useState(false);
  const [userForm, setUserForm] =
    useState<CreateAdminUserPayload>(emptyUserForm);
  const [editForm, setEditForm] = useState<UpdateAdminUserPayload>({
    firstName: "",
    middleName: "",
    lastName: "",
    phoneNumber: "",
    userRole: "student",
    accountStatus: "active",
    reason: "Updated by admin from Users page.",
  });
  const [deletePassword, setDeletePassword] = useState("");

  const totalPages = useMemo(() => {
    if (!total || !query.limit) {
      return undefined;
    }

    return Math.max(1, Math.ceil(total / query.limit));
  }, [total, query.limit]);

  const closeModal = () => {
    setModalMode("none");
    setSelectedUser(null);
    setDeletePassword("");
  };

  const openAddModal = () => {
    setUserForm(emptyUserForm);
    setModalMode("add");
  };

  const openViewModal = async (user: AdminUserItem) => {
    setSelectedUser(user);
    setModalMode("view");
    await viewUser(user.userId);
  };

  const openEditModal = async (user: AdminUserItem) => {
    setSelectedUser(user);

    const latestUser = await viewUser(user.userId);
    const userToEdit = latestUser ?? user;

    setEditForm({
      firstName: userToEdit.firstName,
      middleName: userToEdit.middleName ?? "",
      lastName: userToEdit.lastName,
      phoneNumber: userToEdit.phoneNumber ?? "",
      userRole: userToEdit.userRole,
      accountStatus: userToEdit.accountStatus,
      reason: "Updated by admin from Users page.",
    });

    setModalMode("edit");
  };

  const openDeleteModal = (user: AdminUserItem) => {
    setSelectedUser(user);
    setDeletePassword("");
    setModalMode("delete");
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setQuery((previous) => ({
      ...previous,
      page: 1,
    }));
  };

  const handleCreateUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await addUser({
      ...userForm,
      middleName: userForm.middleName || null,
      phoneNumber: userForm.phoneNumber || null,
    });

    closeModal();
  };

  const handleUpdateUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedUser) {
      return;
    }

    await editUser(selectedUser.userId, {
      ...editForm,
      middleName: editForm.middleName || null,
      phoneNumber: editForm.phoneNumber || null,
      reason: editForm.reason || "Updated by admin from Users page.",
    });

    closeModal();
  };

  const handleDeleteUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedUser) {
      return;
    }

    await removeUser(selectedUser.userId, deletePassword);
    closeModal();
  };

  return (
    <div className="admin-users-page">
      <section className="admin-users-header">
        <h1>Users</h1>

        <div className="admin-breadcrumb">
          <div className="admin-home-icon">⌂</div>
          <span>Home &gt; Users</span>
        </div>
      </section>

      <section className="admin-users-toolbar">
        <form className="admin-search-box" onSubmit={handleSearchSubmit}>
          <span className="search-menu-icon">☰</span>

          <input
            type="text"
            placeholder="Hinted search text"
            value={query.search ?? ""}
            onChange={(event) =>
              setQuery((previous) => ({
                ...previous,
                search: event.target.value,
                page: 1,
              }))
            }
          />

          <button className="search-submit-button" type="submit">
            ⌕
          </button>
        </form>

        <div className="admin-user-actions">
          <button type="button" onClick={openAddModal}>
            +Add User
          </button>

          <button type="button" onClick={() => setShowFilters((current) => !current)}>
            Filter
          </button>

          <button
            type="button"
            onClick={() =>
              setViewMode((current) => (current === "table" ? "cards" : "table"))
            }
          >
            {viewMode === "table" ? "Cards View" : "Table View"}
          </button>

          <button
            type="button"
            disabled={!selectedUser}
            onClick={() => selectedUser && openDeleteModal(selectedUser)}
          >
            Delete User
          </button>
        </div>

        {showFilters && (
          <div className="admin-users-filters">
            <label>
              Role
              <select
                value={query.userRole ?? ""}
                onChange={(event) =>
                  setQuery((previous) => ({
                    ...previous,
                    userRole: event.target.value
                      ? (event.target.value as AdminUserRole)
                      : undefined,
                    page: 1,
                  }))
                }
              >
                <option value="">All roles</option>
                {roleOptions.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Status
              <select
                value={query.accountStatus ?? ""}
                onChange={(event) =>
                  setQuery((previous) => ({
                    ...previous,
                    accountStatus: event.target.value
                      ? (event.target.value as AdminUserStatus)
                      : undefined,
                    page: 1,
                  }))
                }
              >
                <option value="">All statuses</option>
                {statusOptions.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Date Range
              <select
                value={query.createdAt ?? "30d"}
                onChange={(event) =>
                  setQuery((previous) => ({
                    ...previous,
                    createdAt: event.target.value as AdminDateRange,
                    page: 1,
                  }))
                }
              >
                {dateRangeOptions.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </label>

            <button type="button" onClick={exportUsers} disabled={actionLoading}>
              Export Users
            </button>
          </div>
        )}

        {error && <p className="admin-users-error">{error}</p>}
      </section>

      {loading ? (
        <div className="admin-users-loading">Loading users...</div>
      ) : viewMode === "table" ? (
        <section className="admin-users-table-wrapper">
          <table className="admin-users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Last Active</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td className="admin-users-empty" colSpan={6}>
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user.userId}
                    className={
                      selectedUser?.userId === user.userId
                        ? "selected-user-row"
                        : undefined
                    }
                    onClick={() => setSelectedUser(user)}
                  >
                    <td>{getFullName(user)}</td>
                    <td>{user.emailAddress}</td>
                    <td>{formatRole(user.userRole)}</td>
                    <td>{formatStatus(user.accountStatus)}</td>
                    <td>{formatDate(user.lastActive ?? user.lastLogin)}</td>
                    <td onClick={(event) => event.stopPropagation()}>
                      <button
                        className="table-action"
                        type="button"
                        onClick={() => void openViewModal(user)}
                      >
                        View
                      </button>
                      <span>|</span>
                      <button
                        className="table-action"
                        type="button"
                        onClick={() => void openEditModal(user)}
                      >
                        Change
                      </button>
                      <span>|</span>
                      <button
                        className="table-action"
                        type="button"
                        onClick={() => openDeleteModal(user)}
                      >
                        Del
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="admin-pagination">
            <button
              type="button"
              disabled={(query.page ?? 1) <= 1}
              onClick={() =>
                setQuery((previous) => ({
                  ...previous,
                  page: Math.max(1, (previous.page ?? 1) - 1),
                }))
              }
            >
              &lt; Prev
            </button>

            <strong>{query.page ?? 1}</strong>

            {totalPages && <span>/ {totalPages}</span>}

            <button
              type="button"
              disabled={totalPages ? (query.page ?? 1) >= totalPages : false}
              onClick={() =>
                setQuery((previous) => ({
                  ...previous,
                  page: (previous.page ?? 1) + 1,
                }))
              }
            >
              Next &gt;
            </button>
          </div>
        </section>
      ) : (
        <section className="admin-feedback-grid">
          {users.length === 0 ? (
            <p className="admin-users-empty">No users found.</p>
          ) : (
            users.map((user) => (
              <article className="admin-feedback-card" key={user.userId}>
                <div className="feedback-card-header">
                  <div className="user-avatar-placeholder">
                    {user.firstName.charAt(0)}
                    {user.lastName.charAt(0)}
                  </div>

                  <div>
                    <h3>{getFullName(user)}</h3>
                    <p className="star-rating">★★★★★</p>
                  </div>

                  <span>{formatRole(user.userRole)}</span>
                </div>

                <div className="user-card-details">
                  <p>{user.emailAddress}</p>
                  <p>Status: {formatStatus(user.accountStatus)}</p>
                  <p>Last active: {formatDate(user.lastActive ?? user.lastLogin)}</p>
                </div>

                <div className="card-actions">
                  <button type="button" onClick={() => void openViewModal(user)}>
                    View
                  </button>
                  <button type="button" onClick={() => void openEditModal(user)}>
                    Change
                  </button>
                  <button type="button" onClick={() => openDeleteModal(user)}>
                    Del
                  </button>
                </div>
              </article>
            ))
          )}
        </section>
      )}

      {modalMode !== "none" && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal">
            <button className="admin-modal-close" type="button" onClick={closeModal}>
              ×
            </button>

            {modalMode === "add" && (
              <>
                <h2>Add User</h2>

                <form className="admin-user-form" onSubmit={handleCreateUser}>
                  <label>
                    First Name
                    <input
                      required
                      value={userForm.firstName}
                      onChange={(event) =>
                        setUserForm((previous) => ({
                          ...previous,
                          firstName: event.target.value,
                        }))
                      }
                    />
                  </label>

                  <label>
                    Middle Name
                    <input
                      value={userForm.middleName ?? ""}
                      onChange={(event) =>
                        setUserForm((previous) => ({
                          ...previous,
                          middleName: event.target.value,
                        }))
                      }
                    />
                  </label>

                  <label>
                    Last Name
                    <input
                      required
                      value={userForm.lastName}
                      onChange={(event) =>
                        setUserForm((previous) => ({
                          ...previous,
                          lastName: event.target.value,
                        }))
                      }
                    />
                  </label>

                  <label>
                    Email
                    <input
                      required
                      type="email"
                      value={userForm.emailAddress}
                      onChange={(event) =>
                        setUserForm((previous) => ({
                          ...previous,
                          emailAddress: event.target.value,
                        }))
                      }
                    />
                  </label>

                  <label>
                    Phone Number
                    <input
                      value={userForm.phoneNumber ?? ""}
                      onChange={(event) =>
                        setUserForm((previous) => ({
                          ...previous,
                          phoneNumber: event.target.value,
                        }))
                      }
                    />
                  </label>

                  <label>
                    Role
                    <select
                      value={userForm.userRole}
                      onChange={(event) =>
                        setUserForm((previous) => ({
                          ...previous,
                          userRole: event.target.value as AdminUserRole,
                        }))
                      }
                    >
                      {roleOptions.map((role) => (
                        <option key={role.value} value={role.value}>
                          {role.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <button type="submit" disabled={actionLoading}>
                    {actionLoading ? "Creating..." : "Create User"}
                  </button>
                </form>
              </>
            )}

            {modalMode === "view" && selectedUser && (
              <>
                <h2>User Details</h2>

                <div className="admin-user-detail-list">
                  <p>
                    <strong>Name:</strong> {getFullName(selectedUser)}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedUser.emailAddress}
                  </p>
                  <p>
                    <strong>Phone:</strong> {selectedUser.phoneNumber || "-"}
                  </p>
                  <p>
                    <strong>Role:</strong> {formatRole(selectedUser.userRole)}
                  </p>
                  <p>
                    <strong>Status:</strong> {formatStatus(selectedUser.accountStatus)}
                  </p>
                  <p>
                    <strong>Email Verified:</strong>{" "}
                    {selectedUser.emailVerified ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Created:</strong> {formatDate(selectedUser.createdAt)}
                  </p>
                  <p>
                    <strong>Last Active:</strong>{" "}
                    {formatDate(selectedUser.lastActive ?? selectedUser.lastLogin)}
                  </p>
                </div>
              </>
            )}

            {modalMode === "edit" && selectedUser && (
              <>
                <h2>Change User</h2>

                <form className="admin-user-form" onSubmit={handleUpdateUser}>
                  <label>
                    First Name
                    <input
                      value={editForm.firstName ?? ""}
                      onChange={(event) =>
                        setEditForm((previous) => ({
                          ...previous,
                          firstName: event.target.value,
                        }))
                      }
                    />
                  </label>

                  <label>
                    Middle Name
                    <input
                      value={editForm.middleName ?? ""}
                      onChange={(event) =>
                        setEditForm((previous) => ({
                          ...previous,
                          middleName: event.target.value,
                        }))
                      }
                    />
                  </label>

                  <label>
                    Last Name
                    <input
                      value={editForm.lastName ?? ""}
                      onChange={(event) =>
                        setEditForm((previous) => ({
                          ...previous,
                          lastName: event.target.value,
                        }))
                      }
                    />
                  </label>

                  <label>
                    Phone Number
                    <input
                      value={editForm.phoneNumber ?? ""}
                      onChange={(event) =>
                        setEditForm((previous) => ({
                          ...previous,
                          phoneNumber: event.target.value,
                        }))
                      }
                    />
                  </label>

                  <label>
                    Role
                    <select
                      value={editForm.userRole ?? "student"}
                      onChange={(event) =>
                        setEditForm((previous) => ({
                          ...previous,
                          userRole: event.target.value as AdminUserRole,
                        }))
                      }
                    >
                      {roleOptions.map((role) => (
                        <option key={role.value} value={role.value}>
                          {role.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label>
                    Status
                    <select
                      value={editForm.accountStatus ?? "active"}
                      onChange={(event) =>
                        setEditForm((previous) => ({
                          ...previous,
                          accountStatus: event.target.value as AdminUserStatus,
                        }))
                      }
                    >
                      {statusOptions.map((status) => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label>
                    Reason
                    <textarea
                      required
                      value={editForm.reason}
                      onChange={(event) =>
                        setEditForm((previous) => ({
                          ...previous,
                          reason: event.target.value,
                        }))
                      }
                    />
                  </label>

                  <button type="submit" disabled={actionLoading}>
                    {actionLoading ? "Saving..." : "Save Changes"}
                  </button>
                </form>
              </>
            )}

            {modalMode === "delete" && selectedUser && (
              <>
                <h2>Delete User</h2>

                <p>
                  Are you sure you want to delete{" "}
                  <strong>{getFullName(selectedUser)}</strong>?
                </p>

                <form className="admin-user-form" onSubmit={handleDeleteUser}>
                  <label>
                    Admin Password
                    <input
                      required
                      type="password"
                      value={deletePassword}
                      onChange={(event) => setDeletePassword(event.target.value)}
                    />
                  </label>

                  <button
                    className="danger-button"
                    type="submit"
                    disabled={actionLoading}
                  >
                    {actionLoading ? "Deleting..." : "Confirm Delete"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}