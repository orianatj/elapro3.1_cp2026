// src/api/client.js
import axios from "axios";

export const api = axios.create({
  baseURL: "http://52.65.46.84:9000/api/v1"
});
