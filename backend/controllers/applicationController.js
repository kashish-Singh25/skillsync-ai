import Application from "../models/Application.js";
import Job from "../models/Job.js";
import Student from "../models/Student.js";
import { cosineSimilarity } from "../utils/cosineSimilarity.js";
import { getJobMatchAnalysis } from "../services/jobMatchingService.js";

// Apply for Job
// Apply for Job
export const applyJob = async (req, res) => {
    try {
      console.log("===== APPLY JOB =====");
      console.log("Logged in user:", req.user);
  
      const { jobId } = req.body;
  
      // ==========================
      // Check Job Exists
      // ==========================
      const job = await Job.findById(jobId);
  
      if (!job) {
        return res.status(404).json({
          success: false,
          message: "Job not found",
        });
      }
  
      // ==========================
      // Check Already Applied
      // ==========================
      const existingApplication = await Application.findOne({
        student: req.user.id,
        job: jobId,
      });
  
      if (existingApplication) {
        return res.status(400).json({
          success: false,
          message: "You have already applied for this job",
        });
      }
  
      // ==========================
      // Fetch Student
      // ==========================
      const student = await Student.findById(req.user.id);
  
      if (!student) {
        return res.status(404).json({
          success: false,
          message: "Student not found",
        });
      }
  
      // ==========================
// Calculate Semantic Match
// ==========================
let matchScore = 0;

console.log("========== EMBEDDING DEBUG ==========");

console.log("Student Embedding Length:");
console.log(student.embedding?.length);

console.log("Job Embedding Length:");
console.log(job.embedding?.length);

console.log("Student First 5 Values:");
console.log(student.embedding?.slice(0, 5));

console.log("Job First 5 Values:");
console.log(job.embedding?.slice(0, 5));

if (
  Array.isArray(student.embedding) &&
  student.embedding.length > 0 &&
  Array.isArray(job.embedding) &&
  job.embedding.length > 0
) {
  matchScore = cosineSimilarity(
    student.embedding,
    job.embedding
  );
}

console.log("Semantic Match Score:");
console.log(matchScore);
  
      // ==========================
      // Gemini AI Analysis
      // ==========================
      const aiResult = await getJobMatchAnalysis(
        student.skills || [],
        job.requiredSkills?.length
          ? job.requiredSkills
          : job.skills || [],
        matchScore
      );
  
      console.log("Match Score:", matchScore);
      console.log("AI Result:", aiResult);
  
      // ==========================
      // Save Application
      // ==========================
      const application = await Application.create({
        student: req.user.id,
        job: jobId,
  
        matchScore,
        matchedSkills: aiResult.matchedSkills || [],
        missingSkills: aiResult.missingSkills || [],
        reason: aiResult.reason || "",
        recommendation: aiResult.recommendation || "",
      });
  
      return res.status(201).json({
        success: true,
        message: "Application Submitted Successfully",
        application,
      });
  
    } catch (error) {
      console.log(error);
  
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// Update Application Status
export const updateApplicationStatus = async (req, res) => {
    try {
  
      const { applicationId } = req.params;
      const { status } = req.body;
  
      const application = await Application.findByIdAndUpdate(
        applicationId,
        { status },
        { new: true }
      );
  
      if (!application) {
        return res.status(404).json({
          success: false,
          message: "Application not found",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Application status updated successfully",
        application,
      });
  
    } catch (error) {
  
      console.log(error);
  
      res.status(500).json({
        success: false,
        message: error.message,
      });
  
    }
  };


// Get Applicants of a Job
export const getApplicants = async (req, res) => {
    try {
  
      const { jobId } = req.params;
  
      const applications = await Application.find({
        job: jobId,
      })
        .sort({ matchScore: -1 }) // Highest semantic score first
        .populate(
          "student",
          "fullName email college branch skills resume"
        )
        .populate(
          "job",
          "title company"
        );
        console.log(applications); 
  
      res.status(200).json({
        success: true,
        applicants: applications,
      });
  
    } catch (error) {
  
      console.log(error);
  
      res.status(500).json({
        success: false,
        message: error.message,
      });
  
    }
  };

  // Get My Applications
export const getMyApplications = async (req, res) => {
    try {
  
      const applications = await Application.find({
        student: req.user.id,
      })
        .populate(
          "job",
          "title company location salary"
        );
  
      res.status(200).json({
        success: true,
        applications,
      });
  
    } catch (error) {
  
      console.log(error);
  
      res.status(500).json({
        success: false,
        message: error.message,
      });
  
    }
  };