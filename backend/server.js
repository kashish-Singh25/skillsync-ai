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

app.use(
    cors({
      origin: "https://skillsync-ai-2-nfh0.onrender.com",
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