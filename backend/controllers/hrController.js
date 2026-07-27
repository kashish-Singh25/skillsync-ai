import HR from "../models/HR.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register HR
export const registerHR = async (req, res) => {
  try {
    const {
      companyName,
      hrName,
      email,
      password,
      companyWebsite,
      location,
    } = req.body;

    // Check if HR already exists
    const existingHR = await HR.findOne({ email });

    if (existingHR) {
      return res.status(400).json({
        success: false,
        message: "HR already exists",
      });
    }

    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create HR
    const hr = await HR.create({
      companyName,
      hrName,
      email,
      password: hashedPassword,
      companyWebsite,
      location,
    });

    res.status(201).json({
      success: true,
      message: "HR Registered Successfully",
      hr: {
        id: hr._id,
        companyName: hr.companyName,
        hrName: hr.hrName,
        email: hr.email,
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

// Login HR
export const loginHR = async (req, res) => {
  try {
    const { email, password } = req.body;

    const hr = await HR.findOne({ email });

    if (!hr) {
      return res.status(404).json({
        success: false,
        message: "HR not found",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      hr.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
        {
          id: hr._id,
          email: hr.email,
          role: "hr",
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
      hr: {
        id: hr._id,
        companyName: hr.companyName,
        hrName: hr.hrName,
        email: hr.email,
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

// Get HR Profile
// export const getHRProfile = async (req, res) => {
//     try {

//         console.log("Token User:", req.user);
// console.log("Searching HR ID:", req.user.id);
  
//         const hr = await HR.findById(req.user.id).select("-password");  
//       res.status(200).json({
//         success: true,
//         hr
//       });
  
//     } catch (error) {
  
//       res.status(500).json({
//         success: false,
//         message: error.message
//       });
  
//     }
//   };

export const getHRProfile = async (req, res) => {
    try {
  
      console.log("==============");
      console.log("Token Data:", req.user);
      console.log("Searching HR ID:", req.user.id);
  
      const hr = await HR.findById(req.user.id).select("-password");
  
      console.log("HR Found:", hr);
  
      res.status(200).json({
        success: true,
        hr,
      });
  
    } catch (error) {
  
      console.log(error);
  
      res.status(500).json({
        success: false,
        message: error.message,
      });
  
    }
  };
  
  
  // Update HR Profile
  export const updateHRProfile = async (req, res) => {
  
    try {
  
        const hr = await HR.findByIdAndUpdate(
            req.user.id,
        req.body,
        {
          new: true
        }
      ).select("-password");
  
      res.status(200).json({
        success: true,
        message: "Profile Updated Successfully",
        hr
      });
  
    } catch (error) {
  
      res.status(500).json({
        success: false,
        message: error.message
      });
  
    }
  
  };