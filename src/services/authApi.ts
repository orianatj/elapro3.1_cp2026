import { api } from "./client";
import type { Credentials, Registration, PasswordReset, EmailRequest, VerifyEmailParams } from "../types/common/Auth.ts"

export const login = (credentials: Credentials) =>
  api.post("/auth/login", credentials);

export const register = (data: Registration) =>
  api.post("/auth/register", data);

export const forgotPassword = (data: EmailRequest) =>
  api.post("/api/v1/auth/forgot-password", data);

export const resetPassword = (data: PasswordReset) =>
  api.post("/api/v1/auth/reset-password", data);

export const sendVerify = (params: VerifyEmailParams) =>
  api.get("/api/v1/auth/verify-email", { params });

export const resendVerify = (data: EmailRequest) =>
  api.post("/api/v1/auth/resend-verify-email", data);

export const refreshToken = () =>
  api.post("/auth/refresh-session");

export const logout = () =>
  api.post("/auth/logout");

