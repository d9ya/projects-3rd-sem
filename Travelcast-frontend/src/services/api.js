import axios from "axios";

const Api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach Token to every request
Api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// --- Auth & User ---
export const createUserApi = (data) => Api.post("/api/auth/register", data);
export const loginUserApi = (data) => Api.post("/api/auth/login", data);
export const saveSecurityAnswersApi = (data) => Api.post("/api/security/setup", data);

// --- Profile & Settings ---
export const getProfileApi = () => Api.get("/api/profile"); 
export const updateProfileApi = (data) => Api.put("/api/profile", data);
export const changePasswordApi = (data) => Api.put("/api/change-password", data);

// --- Dashboard & Trips ---
export const getDashboardApi = () => Api.get("/api/dashboard/dashboard");
// Ensure this matches your CreateTrip.jsx call if you want to use the instance:
export const createTripApi = (data) => Api.post("/api/trips/create", data);

 export const subscribeUserApi = (data) => Api.post("/api/subscription/subscribe", data);


export const getPackingApi = () =>
  Api.get("/api/packing");

export const addPackingItemApi = (data) =>
  Api.post("/api/packing", data);

export const updatePackingItemApi = (itemId, data) =>
  Api.put(`/api/packing/${itemId}`, data);

export const deletePackingItemsApi = (itemIds) =>
  Api.delete("/api/packing", {
    data: { itemIds }
  });

 
export const savePackingNotesApi = (data) =>
  Api.post("/api/packing/saveNotes", data);

