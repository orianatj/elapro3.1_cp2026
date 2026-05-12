import { api } from "./client";
import type { Credentials, Registration, PasswordReset, EmailRequest, ForgotPassword } from "../types/common/Auth.ts"

export const login = (credentials: Credentials) =>
  api.post("/auth/login", credentials);

export const register = async (data: Registration) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const forgotPassword = async (data: ForgotPassword) => {
  const response = await api.post("/auth/forgot-password", data);
  return response.data;
};

export const resetPassword = (data: PasswordReset) =>
  api.post("/auth/reset-password", data);

export const resendVerify = (data: EmailRequest) =>
  api.post("/auth/resend-verify-email", data);

export const verifyEmail = () =>
  api.get("/auth/verify-email");

export const refreshToken = () =>
  api.post("/auth/refresh-session");

export const logout = () =>
  api.post("/auth/logout");

