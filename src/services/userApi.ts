import { api } from "./client";

// Retrieve authenticated user's details 
export const currentUser = () =>
    api.get("/api/v1/users/me");

