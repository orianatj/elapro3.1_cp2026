// src/api/client.js
import axios from "axios";

export const api = axios.create({
  baseURL: "http://52.65.46.84:9000/api/v1"
});


// Request interceptor: for adding auth headers


/* Reponse interceptor: error handling (401, etc.), refreshing tokens, global error handling */