import Student from "../models/Student.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
import supabase from "../config/supabase.js";

// ======================
// Register Student
// ======================

export const registerStudent = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      college,
      branch,
      graduationYear,
      github,
      linkedin,
      skills,
      projects,
    } = req.body;

    const existingStudent = await Student.findOne({ email });

    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: "Student already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await Student.create({
      fullName,
      email,
      password: hashedPassword,
      college,
      branch,
      graduationYear,
      github,
      linkedin,
      skills,
      projects,
    });

    res.status(201).json({
      success: true,
      message: "Student Registered Successfully",
      student: {
        id: student._id,
        fullName: student.fullName,
        email: student.email,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================
// Login Student
// ======================

export const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      student.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        id: student._id,
        email: student.email,
        role: "student",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      student: {
        id: student._id,
        fullName: student.fullName,
        email: student.email,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================
// Get Student Profile
// ======================

export const getStudentProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id).select("-password");

    res.status(200).json({
      success: true,
      student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================
// Update Student Profile
// ======================

export const updateStudentProfile = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.user.id,
      req.body,
      {
        new: true,
      }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================
// Upload Resume
// ======================

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload resume",
      });
    }

    const fileBuffer = fs.readFileSync(req.file.path);


    const fileName = `${Date.now()}-${req.file.originalname}`;

    const { error } = await supabase.storage
      .from("resumes")
      .upload(fileName, fileBuffer, {
        contentType: "application/pdf",
        upsert: false,
      });

    if (error) {
      fs.unlinkSync(req.file.path);

      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    const { data } = supabase.storage
  .from("resumes")
  .getPublicUrl(fileName);

fs.unlinkSync(req.file.path);

const student = await Student.findByIdAndUpdate(
  req.user.id,
  {
    resume: data.publicUrl,
    resumeText: "", // optional
  },
  {
    new: true,
  }
).select("-password");

    res.status(200).json({
      success: true,
      message: "Resume uploaded successfully",
      resume: student.resume,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};