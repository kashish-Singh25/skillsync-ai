import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

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

const Application = mongoose.model("Application", applicationSchema);

export default Application;