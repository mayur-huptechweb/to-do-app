import API from "./axios";

export const getStats = () => API.get("/stats");
