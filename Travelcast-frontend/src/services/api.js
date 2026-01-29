import axios from "axios";

const Api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
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


export const createUserApi = (data) =>
  axios.post("http://localhost:3000/api/user/register", data, {
    headers: { "Content-Type": "application/json" },
  });
export const loginUserApi = (data) => Api.post("/api/user/loginUser", data);

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
