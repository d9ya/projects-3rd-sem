import axios from "axios";

const Api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // http://localhost:3000/api
  withCredentials: true,
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


export const createUserApi = (data) =>
  Api.post("/user/register", data);

export const loginUserApi = (data) =>
  Api.post("/user/login", data);


export const setupSecurityApi = (data) =>
  Api.post("/security/setup", data);


export const subscribeUserApi = (data) =>
  Api.post("/subscription/subscribe", data);

export const getUserSubscriptionsApi = (userId) =>
  Api.get(`/subscription/user/${userId}`);

export default Api;
