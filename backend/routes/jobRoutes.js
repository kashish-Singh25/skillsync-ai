import express from "express";
import {
  createJob,
  getAllJobs,
  deleteJob,
  updateJob,
} from "../controllers/jobController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create Job
router.post("/create", authMiddleware, createJob);

// Get All Jobs
router.get("/all", getAllJobs);

// Delete Job
router.delete("/:jobId", authMiddleware, deleteJob);

// Update Job
router.put("/:jobId", authMiddleware, updateJob);

export default router;