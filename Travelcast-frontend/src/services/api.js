import axios from "axios";

const Api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
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
export const getDashboardApi = (data) => Api.get("/api/dashboard/dashboard", data);
export const getProfileApi = () => Api.get("/api/profile"); // GET profile
export const updateProfileApi = (data) => Api.put("/api/profile", data); // PUT profile update
export const changePasswordApi = (data) => Api.put("/api/change-password", data);
export const subscribeUserApi = (data) => Api.post("/api/user/subscribe", data);
 
export default Api;
