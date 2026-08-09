import express from "express";
import {
  createJob,
  getAllJobs,
  getMyJobs,
  deleteJob,
  updateJob,
} from "../controllers/jobController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create Job
router.post("/create", authMiddleware, createJob);

// Get jobs created by logged-in HR
router.get("/my-jobs", authMiddleware, getMyJobs);

// Get all jobs - students/professionals
router.get("/all", getAllJobs);

// Get All Jobs
router.get("/all", getAllJobs);

// Delete Job
router.delete("/:jobId", authMiddleware, deleteJob);

// Update Job
router.put("/:jobId", authMiddleware, updateJob);

router.get(
  "/my-jobs",
  authMiddleware,
  getMyJobs
);

export default router;