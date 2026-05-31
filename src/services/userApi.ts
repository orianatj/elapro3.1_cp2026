import { api } from "./client";
import type { UpdateUserData } from "../types/common/User";

// Retrieve authenticated user's details
export const currentUser = () =>
    api.get("/users/me");

export const updateMe = (data: UpdateUserData) =>
    api.patch("/users/me/user-data", data);

export const updateEmail = (data: { password: string; emailAddress: string; confirmEmailAddress: string }) =>
    api.post("/users/me/email", data);

export const confirmEmailChange = (token: string) =>
    api.get("/users/me/email", { params: { token } });

export const cancelEmailChange = (token: string) =>
    api.get("/users/me/email/cancel", { params: { token } });

export const changePassword = (data: { password: string; newPassword: string; confirmPassword: string }) =>
    api.patch("/users/me/password", data)

export const initateDeleteAccount = (password: string) =>
    api.post("/users/me/delete-initiate", { password });

export const confirmDeleteAccount = (token: string) =>
    api.get("/users/me/delete-confirm", { params: { token } });