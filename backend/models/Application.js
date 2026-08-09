import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    // Student applicant
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: false,
    },
    
    professional: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Professional",
      required: false,
    },

    // Identify who applied
    applicantType: {
      type: String,
      enum: ["Student", "Professional"],
      required: true,
    },

    // Job applied for
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    // Application status
    status: {
      type: String,
      enum: ["Applied", "Accepted", "Rejected"],
      default: "Applied",
    },

    // ==========================
    // AI Matching Fields
    // ==========================

    matchScore: {
      type: Number,
      default: 0,
    },

    matchedSkills: {
      type: [String],
      default: [],
    },

    missingSkills: {
      type: [String],
      default: [],
    },

    reason: {
      type: String,
      default: "",
    },

    recommendation: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model(
  "Application",
  applicationSchema
);

export default Application;