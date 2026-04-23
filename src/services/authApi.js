import { api } from "./client";

export const login = (credentials) =>
  api.post("/auth/login", credentials);

export const register = (data) =>
  api.post("/auth/register", data);

export const refreshToken = () =>
  api.post("/auth/refresh");

export const logout = () =>
  api.post("/auth/logout");