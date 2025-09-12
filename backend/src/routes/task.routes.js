import express from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// CRUD routes
router.route("/")
  .get(protect, getTasks)       // Get all tasks for user
  .post(protect, createTask);   // Create a new task

router.route("/:id")
  .get(protect, getTaskById)    // Get task by ID
  .put(protect, updateTask)     // Update task
  .delete(protect, deleteTask); // Delete task

export default router;
