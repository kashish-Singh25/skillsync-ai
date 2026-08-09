import express from "express";

import {
  registerProfessional,
  loginProfessional,
  getProfessionalProfile,
} from "../controllers/professionalController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/register",
  registerProfessional
);

router.post(
  "/login",
  loginProfessional
);

router.get(
  "/profile",
  authMiddleware,
  getProfessionalProfile
);

export default router;