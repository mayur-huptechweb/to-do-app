import API from "./axios";

// Task APIs
export const createTask = (taskData) => API.post("/tasks", taskData);
export const getTasks = () => API.get("/tasks");
export const getTaskById = (id) => API.get(`/tasks/${id}`);
// export const toggleTaskStatus = (id) => API.put(`/tasks/${id}`);
// export const deleteTask = (id) => API.delete(`/tasks/${id}`);

// import API from "./axios";

// Task APIs
export const fetchTasks = () => API.get("/tasks");
export const addTask = (taskData) => API.post("/tasks", taskData);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
export const toggleTaskStatus = (id) => API.put(`/tasks/${id}/status`);
