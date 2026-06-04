import { api } from "./client";
import type { Credentials, Registration, PasswordReset, EmailRequest, ForgotPassword, VerifySignup, RefreshToken } from "../types/common/Auth.ts"

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

export const resetPassword = async (data: PasswordReset) => {
  const response = await api.post("/auth/reset-password", data);
  return response.data;
};

export const resendVerify = async (data: EmailRequest) => {
  const response = await api.post("/auth/resend-verify-email", data);
  return response.data;
};

export const verifyEmail = async ({ token }: VerifySignup) => {
  const response = await api.get("/auth/verify-email", { params: { token }, });
  return response.data;
};

export const refreshSession = async () => {
  const response = await api.post("/auth/refresh-session");
  return response.data;
}

export const refreshToken = async ({ refreshToken }: RefreshToken) => {
  const response = await api.post("/auth/refresh-token", { refreshToken, });
  return response.data;
}

export const logout = () =>
  api.post("/auth/logout");

