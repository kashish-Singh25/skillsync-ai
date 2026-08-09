import Application from "../models/Application.js";
import Job from "../models/Job.js";
import Student from "../models/Student.js";
import Professional from "../models/Professional.js";
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
      let existingApplication;

if (req.user.role === "student") {
  existingApplication = await Application.findOne({
    student: req.user.id,
    job: jobId,
  });
}

if (req.user.role === "professional") {
  existingApplication = await Application.findOne({
    professional: req.user.id,
    job: jobId,
  });
}

if (existingApplication) {
  return res.status(400).json({
    success: false,
    message: "You have already applied for this job",
  });
}
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
  
      let applicant;
let applicantType;

if (req.user.role === "student") {
  applicant = await Student.findById(req.user.id);
  applicantType = "Student";
}

if (req.user.role === "professional") {
  applicant = await Professional.findById(req.user.id);
  applicantType = "Professional";
}

if (!applicant) {
  return res.status(404).json({
    success: false,
    message: "Applicant not found",
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
        applicant.skills || [],
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
      const applicationData = {
        job: jobId,
        applicantType,
      
        matchScore,
        matchedSkills: aiResult.matchedSkills || [],
        missingSkills: aiResult.missingSkills || [],
        reason: aiResult.reason || "",
        recommendation: aiResult.recommendation || "",
      };
      
      if (req.user.role === "student") {
        applicationData.student = req.user.id;
      }
      
      if (req.user.role === "professional") {
        applicationData.professional = req.user.id;
      }
      
      const application = await Application.create(applicationData);
  
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

export const getApplicants = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Only the HR who created this job can see applicants
    if (String(job.hr) !== String(req.user.id)) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to view these applicants",
      });
    }

    const applications = await Application.find({
      job: jobId,
    })
      .sort({ matchScore: -1 })
      .populate(
        "student",
        "fullName email college branch skills resume"
      )
      .populate(
        "professional",
        "fullName email skills resume"
      )
      .populate(
        "job",
        "title company"
      );

    console.log("Applicants:", applications);

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
      let query = {};
  
      if (req.user.role === "student") {
        query = {
          student: req.user.id,
        };
      }
  
      if (req.user.role === "professional") {
        query = {
          professional: req.user.id,
        };
      }
  
      const applications = await Application.find(query)
        .populate(
          "job",
          "title company location salary"
        )
        .sort({ createdAt: -1 });
  
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