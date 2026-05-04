// src/api/client.js
import axios from "axios";

// Create axios isntance that references the ELA Pro FastAPI Wrapper 
export const api = axios.create({
  baseURL: "http://52.65.46.84:9000/api/v1"
});


// Define request interceptor: for adding auth headers
axios.interceptors.request.use((config) => {

  // Retrieve session authentication token and assign to variable
  const token = sessionStorage.getItem("token");

  // If a token exists (authenticated session) add it to the request header 
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }

  // Return request with header added
  return config;
});

/* TODO: implement token refresh using /auth/refresh-session when backend expiry/401 behaviour is confirmed */

// Define reponse interceptor
axios.interceptors.response.use(
  // Success handler: any 2xx response is returned unchanged 
  (response) => response,
  // Error handler: any non-2xx (only 422 currently) response and rethrow it 
  (error) => Promise.reject(error)
);