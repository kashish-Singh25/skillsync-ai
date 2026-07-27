import express from "express";

import {
    applyJob,
    getApplicants,
    updateApplicationStatus,
    getMyApplications,
  } from "../controllers/applicationController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Student applies for job
router.post("/apply", authMiddleware, applyJob);

// HR views applicants of a job
router.get(
  "/applicants/:jobId",
  authMiddleware,
  getApplicants
);

// HR updates application status
router.put(
    "/status/:applicationId",
    authMiddleware,
    updateApplicationStatus
  );

  // Student views own applications
router.get(
    "/my-applications",
    authMiddleware,
    getMyApplications
  );

export default router;