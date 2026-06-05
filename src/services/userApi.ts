import { api } from "./client";
import type { UpdateUserData } from "../types/common/User";
import type { BillingHistoryQuery, UpdateSubscription } from "../types/common/billing";

// Retrieve authenticated user's details
export const currentUser = () =>
    api.get("/users/me");

// BILLING & SUBSCRIPTION 

// Retrieve user's current subscription
export const viewSubscription = async () => {
    const response = await api.get("/users/me/billing/plan");
    return response.data;
};

// Update a user's subscription 
export const updateSubscription = async (data: UpdateSubscription) => {
    const response = await api.patch("/users/me/billing/plan", data);
    return response.data;
};

// Cancel a user's subscription
export const cancelSubscription = async (password: string) => {
    const response = await api.patch("/users/me/billing/subscription", { password });
    return response.data;
};

// Retrieve user's current payment details
export const getPaymentMethod = async () => {
    const response = await api.get("/users/me/billing/payment-method");
    return response.data;
};



// Retrieve user's billing history 
export const getBillingHistory = async (params: BillingHistoryQuery) => {
    const response = await api.get("/users/me/billing/history", { params });
    return response.data;
};

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

