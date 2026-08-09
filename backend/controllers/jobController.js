import Job from "../models/Job.js";
import { analyzeJob } from "../services/jobAnalyzerService.js";

export const createJob = async (req, res) => {
    try {
      const {
        company,
        title,
        description,
        skills,
        location,
        salary,
      } = req.body;

      console.log("===== REQ BODY =====");
console.log(req.body);

console.log("===== VALUES =====");
console.log({
  company,
  title,
  description,
  skills,
  location,
  salary,
});
  
      // AI Analysis
      const aiAnalysis = await analyzeJob({
        title,
        description,
        skills,
      });

      console.log("===== AI ANALYSIS =====");
      console.log(aiAnalysis);
  
      console.log("===== JOB TO SAVE =====");

console.log({
  company,
  title,
  description,
  skills,
  location,
  salary,

  jobSummary: aiAnalysis.jobSummary,
  requiredSkills: aiAnalysis.requiredSkills,
  prioritySkills: aiAnalysis.prioritySkills,
  embedding: aiAnalysis.embedding,
});
      
      const job = await Job.create({
        company,
        title,
        description,
        skills,
        location,
        salary,
        hr: req.user.id,
  
        jobSummary: aiAnalysis.jobSummary,
        requiredSkills: aiAnalysis.requiredSkills,
        prioritySkills: aiAnalysis.prioritySkills,
        embedding: aiAnalysis.embedding,
      });
  
      res.status(201).json({
        success: true,
        message: "Job Created Successfully",
        job,
      });
  
    } catch (error) {
      console.log(error);
  
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// ==========================
// Get Jobs of Logged-in HR
// ==========================
export const getMyJobs = async (req, res) => {
    try {
  
      const jobs = await Job.find({
        hr: req.user.id,
      })
        .populate("hr", "companyName hrName email")
        .sort({ createdAt: -1 });
  
      res.status(200).json({
        success: true,
        jobs,
      });
  
    } catch (error) {
  
      console.log(error);
  
      res.status(500).json({
        success: false,
        message: error.message,
      });
  
    }
  };



// Get All Jobs
export const getAllJobs = async (req, res) => {
    try {
  
      const jobs = await Job.find()
        .populate("hr", "companyName hrName email")
        .sort({ createdAt: -1 });
  
      res.status(200).json({
        success: true,
        jobs,
      });
  
    } catch (error) {
  
      console.log(error);
  
      res.status(500).json({
        success: false,
        message: error.message,
      });
  
    }
  };

  // Delete Job
export const deleteJob = async (req, res) => {
    try {
      const { jobId } = req.params;
  
      const job = await Job.findById(jobId);
  
      if (!job) {
        return res.status(404).json({
          success: false,
          message: "Job not found",
        });
      }

      if (String(job.hr) !== String(req.user.id)) {
        return res.status(403).json({
          success: false,
          message: "You are not allowed to modify this job",
        });
      }
  
      await Job.findByIdAndDelete(jobId);
  
      res.status(200).json({
        success: true,
        message: "Job deleted successfully",
      });
  
    } catch (error) {
      console.log(error);
  
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };


  // Update Job
  export const updateJob = async (req, res) => {
    try {
  
      const { jobId } = req.params;
  
      const job = await Job.findById(jobId);
  
      if (!job) {
        return res.status(404).json({
          success: false,
          message: "Job not found",
        });
      }
  
      if (String(job.hr) !== String(req.user.id)) {
        return res.status(403).json({
          success: false,
          message: "You are not allowed to update this job",
        });
      }
  
      Object.assign(job, req.body);
  
      await job.save();
  
      res.status(200).json({
        success: true,
        message: "Job updated successfully",
        job,
      });
  
    } catch (error) {
  
      console.log(error);
  
      res.status(500).json({
        success: false,
        message: error.message,
      });
  
    }
  };