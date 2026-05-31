import { api } from "./client";
import type { UpdateUserData } from "../types/common/User";

// Retrieve authenticated user's details
export const currentUser = () =>
    api.get("/users/me");

export const updateMe = (data: UpdateUserData) =>
    api.patch("/users/me/user-data", data);