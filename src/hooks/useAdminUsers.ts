import { useCallback, useEffect, useState } from "react";

import {
  createAdminUser,
  deleteAdminUser,
  exportAdminUsers,
  getAdminUser,
  getAdminUsers,
  updateAdminUser,
} from "../services/adminApi";

import type {
  AdminUserItem,
  AdminUsersQuery,
  CreateAdminUserPayload,
  UpdateAdminUserPayload,
} from "../services/adminApi";
export function useAdminUsers() {
  const [users, setUsers] = useState<AdminUserItem[]>([]);
  const [selectedUser, setSelectedUser] = useState<AdminUserItem | null>(null);

  const [query, setQuery] = useState<AdminUsersQuery>({
    search: "",
    createdAt: "30d",
    sortBy: "createdAt",
    sortOrder: "desc",
    limit: 25,
    page: 1,
  });

  const [total, setTotal] = useState<number | undefined>();
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAdminUsers(query);

      setUsers(response.users);
      setTotal(response.total);
    } catch (err) {
      console.error(err);
      setError("Could not load users. Please check your API server and login token.");
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    void loadUsers();
  }, [loadUsers]);

  const viewUser = async (userId: string) => {
    try {
      setActionLoading(true);
      setError("");

      const user = await getAdminUser(userId);
      setSelectedUser(user);

      return user;
    } catch (err) {
      console.error(err);
      setError("Could not load user details.");
      return null;
    } finally {
      setActionLoading(false);
    }
  };

  const addUser = async (payload: CreateAdminUserPayload) => {
    try {
      setActionLoading(true);
      setError("");

      await createAdminUser(payload);
      await loadUsers();
    } catch (err) {
      console.error(err);
      setError("Could not create user. The email may already exist.");
      throw err;
    } finally {
      setActionLoading(false);
    }
  };

  const editUser = async (userId: string, payload: UpdateAdminUserPayload) => {
    try {
      setActionLoading(true);
      setError("");

      await updateAdminUser(userId, payload);
      await loadUsers();
    } catch (err) {
      console.error(err);
      setError("Could not update user.");
      throw err;
    } finally {
      setActionLoading(false);
    }
  };

  const removeUser = async (userId: string, password: string) => {
    try {
      setActionLoading(true);
      setError("");

      await deleteAdminUser(userId, password);
      await loadUsers();
    } catch (err) {
      console.error(err);
      setError("Could not delete user. Please check the admin password.");
      throw err;
    } finally {
      setActionLoading(false);
    }
  };

  const exportUsers = async () => {
    try {
      setActionLoading(true);
      setError("");

      await exportAdminUsers(query);
    } catch (err) {
      console.error(err);
      setError("Could not export users.");
    } finally {
      setActionLoading(false);
    }
  };

  return {
    users,
    selectedUser,
    query,
    total,
    loading,
    actionLoading,
    error,
    setQuery,
    setSelectedUser,
    loadUsers,
    viewUser,
    addUser,
    editUser,
    removeUser,
    exportUsers,
  };
}