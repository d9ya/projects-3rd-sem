import axios from "axios";

const Api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token automatically
Api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Auth
export const createUserApi = (data) => Api.post("/api/user/register", data);
export const loginUserApi = (data) => Api.post("/api/user/loginUser", data);


// Subscription
export const subscribeUserApi = (data) =>
  Api.post("/api/subscription/subscribe", data);


