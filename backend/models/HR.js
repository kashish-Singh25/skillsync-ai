import mongoose from "mongoose";

const hrSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    hrName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    companyWebsite: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    companyLogo: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const HR = mongoose.model("HR", hrSchema);

export default HR;