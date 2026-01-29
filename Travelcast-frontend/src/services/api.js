import axios from "axios";

const Api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});


Api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Auth
export const createUserApi = (data) => Api.post("/api/user/register", data);
export const loginUserApi = (data) => Api.post("/api/user/login", data);
export const getDashboardApi = (data) => Api.get("/api/dashboard/dashboard", data);
export const getProfileApi = () => Api.get("/api/profile"); // GET profile
export const updateProfileApi = (data) => Api.put("/api/profile", data); // PUT profile update
export const changePasswordApi = (data) => Api.put("/api/change-password", data);
export const subscribeUserApi = (data) => Api.post("/api/user/subscribe", data);
 
export default Api;

// Subscription
export const subscribeUserApi = (data) => Api.post("/api/user/subscribe", data);

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


export const saveSecurityAnswersApi = (data) =>
  Api.post("/api/security/setup", data);

