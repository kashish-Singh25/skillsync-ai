import Professional from "../models/Professional.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ==========================
// Register Professional
// ==========================

export const registerProfessional = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      phone,
      currentJobTitle,
      company,
      experience,
      skills,
      projects,
      github,
      linkedin,
    } = req.body;

    const existingProfessional = await Professional.findOne({
      email,
    });

    if (existingProfessional) {
      return res.status(400).json({
        success: false,
        message: "Professional already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const professional = await Professional.create({
      fullName,
      email,
      password: hashedPassword,
      phone,
      currentJobTitle,
      company,
      experience,
      skills,
      projects,
      github,
      linkedin,
    });

    res.status(201).json({
      success: true,
      message: "Professional Registered Successfully",
      professional: {
        id: professional._id,
        fullName: professional.fullName,
        email: professional.email,
      },
    });
  } catch (error) {
    console.log("PROFESSIONAL REGISTER ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Login Professional
// ==========================

export const loginProfessional = async (req, res) => {
  try {
    const { email, password } = req.body;

    const professional = await Professional.findOne({
      email,
    });

    if (!professional) {
      return res.status(404).json({
        success: false,
        message: "Professional not found",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      professional.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        id: professional._id,
        email: professional.email,
        role: "professional",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      professional: {
        id: professional._id,
        fullName: professional.fullName,
        email: professional.email,
      },
    });
  } catch (error) {
    console.log("PROFESSIONAL LOGIN ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Get Professional Profile
// ==========================

export const getProfessionalProfile = async (req, res) => {
  try {
    const professional = await Professional.findById(
      req.user.id
    ).select("-password");

    if (!professional) {
      return res.status(404).json({
        success: false,
        message: "Professional not found",
      });
    }

    res.status(200).json({
      success: true,
      professional,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};