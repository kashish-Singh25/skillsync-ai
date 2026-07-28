import "dotenv/config";

import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import studentRoutes from "./routes/studentRoutes.js";
import hrRoutes from "./routes/hrRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import resumeAIRoutes from "./routes/resumeAIRoutes.js";

connectDB();

const app = express();

// app.use(cors());

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://skillsync-ai-2-nfh0.onrender.com",
  ];
  
  app.use(
    cors({
      origin: function (origin, callback) {
        // Allow Postman or server-to-server requests
        if (!origin) return callback(null, true);
  
        if (allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
    })
  );

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use("/api/student", studentRoutes);
app.use("/api/hr", hrRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/application", applicationRoutes);
app.use("/api/resume-ai", resumeAIRoutes);

app.get("/", (req, res) => {
  res.send("🚀 SkillSync AI Backend is Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server is running on Port ${PORT}`);
});