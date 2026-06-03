// src/api/client.js
import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import { refreshToken } from "./authApi";

// Create axios instance that references the ELA Pro FastAPI Wrapper 
export const api = axios.create({
  baseURL: "https://ela-pro.duckdns.org/api/v1"
});

let refreshPromise: Promise<any> | null = null;


// Define request interceptor: for adding auth headers
api.interceptors.request.use((config) => {

  // Retrieve session authentication token and assign to variable
  const token = sessionStorage.getItem("token");

  // If a token exists (authenticated session) add it to the request header 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Return request with header added
  return config;
});



// Define reponse interceptor
api.interceptors.response.use(

  (response) => response,

  async (error) => {

    const status = error.response?.status;

    // If token has expired 
    if (status === 401) {

      const originalRequest = error.config as AxiosRequestConfig & {
        _retry?: boolean;
      };

      if (!originalRequest) {
        return Promise.reject(error);
      }

      if (originalRequest._retry) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;


      // Fetch an access token using the refresh token stored at login
      try {

        const storedRefreshToken = sessionStorage.getItem("refreshToken");

        if (!storedRefreshToken) {
          throw new Error("Session expired. Please log in again.");
        }

        // Prevent multiple refresh requests
        if (!refreshPromise) {
          refreshPromise = refreshToken({ refreshToken: storedRefreshToken, });
        }

        const data = await refreshPromise;
        refreshPromise = null;

        // If no data is returned create an error message
        if (!data?.data?.accessToken || !data?.data?.refreshToken) {
          throw new Error("Missing token in refresh response");
        }

        // Provide fresh access token to session storage
        sessionStorage.setItem("token", data.data.accessToken);

        // Provide fresh refreshToken to session storage
        sessionStorage.setItem("refreshToken", data.data.refreshToken);

        // Retry the request that failed
        return api(originalRequest);

      } catch (error: any) {

        refreshPromise = null;

        sessionStorage.removeItem("token");
        sessionStorage.removeItem("refreshToken");

        window.location.href = "/login";

        return Promise.reject(new Error("Session expired. Please log in again."));
      }

    };

    if (status === 500) {
      console.error("Global server error:", error.response?.data);
    }

    return Promise.reject(error);
  }
);

