import API from "./axios";

// Auth APIs
export const register = (userData) => API.post("/auth/register", userData);
export const login = (credentials) => API.post("/auth/login", credentials);
export const getProfile = () => API.get("/auth/profile");
export const fetchStats = () => API.get("/auth/stats");