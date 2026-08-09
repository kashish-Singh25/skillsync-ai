import express from "express";
// import { registerStudent } from "../controllers/studentController.js";

// const router = express.Router();

// // Register Student
// router.post("/register", registerStudent);

// export default router;

import { 
    registerStudent,
    loginStudent,
    getStudentProfile,
    updateStudentProfile,
    uploadResume
} from "../controllers/studentController.js";


import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();


// Register Student
router.post(
    "/register",
    registerStudent
);


// Login Student
router.post(
    "/login",
    loginStudent
);

router.get(
    "/profile",
    authMiddleware,
    getStudentProfile
);

router.put(
    "/update-profile",
    authMiddleware,
    updateStudentProfile
    );

    router.post(
        "/upload-resume",
        authMiddleware,
        upload.single("resume"),
        uploadResume
    );

export default router;