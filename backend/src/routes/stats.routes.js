import express from "express";
import { getStats } from "../controllers/stats.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// GET /api/stats
router.get("/", protect, getStats);

export default router;
