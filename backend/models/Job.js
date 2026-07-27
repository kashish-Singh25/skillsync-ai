import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    skills: [
      {
        type: String,
      },
    ],

    location: {
      type: String,
      default: "Remote",
    },

    salary: {
      type: String,
      default: "",
    },

    hr: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HR",
      required: true,
    },

    // ==========================
// AI Fields
// ==========================

jobSummary: {
    type: String,
    default: "",
  },
  
  requiredSkills: {
    type: [String],
    default: [],
  },
  
  prioritySkills: {
    type: [String],
    default: [],
  },
  
  embedding: {
    type: [Number],
    default: [],
  },

  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;