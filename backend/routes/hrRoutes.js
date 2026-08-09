import express from "express";
// import { registerHR, loginHR } from "../controllers/hrController.js";

import {
    registerHR,
    loginHR,
    getHRProfile,
    updateHRProfile
  } from "../controllers/hrController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Register HR
router.post("/register", registerHR);

// Login HR
router.post("/login", loginHR);

// Get HR Profile
router.get("/profile", authMiddleware, getHRProfile);

// Update HR Profile
router.put("/update-profile", authMiddleware, updateHRProfile);

export default router;