// import mongoose from "mongoose";

// const studentSchema = new mongoose.Schema(
//   {
//     fullName: {
//       type: String,
//       required: true,
//     },

//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },

//     password: {
//       type: String,
//       required: true,
//     },

//     college: {
//       type: String,
//       required: true,
//     },

//     branch: {
//       type: String,
//       required: true,
//     },

//     graduationYear: {
//       type: Number,
//       required: true,
//     },

//     skills: {
//       type: [String],
//       default: [],
//     },

//     resume: {
//       type: String,
//       default: "",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// export default mongoose.model("Student", studentSchema);


import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    college: {
      type: String,
      required: true,
    },

    branch: {
      type: String,
      required: true,
    },

    graduationYear: {
      type: Number,
      required: true,
    },

    github: {
      type: String,
      default: "",
    },

    linkedin: {
      type: String,
      default: "",
    },

    skills: {
      type: [String],
      default: [],
    },

    // projects: {
    //   {
    //     type: String,
    //   default: "",
    //   }

    // },

    projects:[String],

    resume: {
        type: String,
        default: "",
      },
      
      resumeText: {
        type: String,
        default: "",
      },
      
      embedding: {
        type: [Number],
        default: [],
      },
      
      aiAnalysis: {
      
        resumeScore: {
          type: Number,
          default: 0,
        },
      
        extractedSkills: {
          type: [String],
          default: [],
        },
      
        education: {
            type: [mongoose.Schema.Types.Mixed],
            default: [],
          },
          
          experience: {
            type: [mongoose.Schema.Types.Mixed],
            default: [],
          },
      
        certifications: {
          type: [String],
          default: [],
        },
      
        strengths: {
          type: [String],
          default: [],
        },
      
        weaknesses: {
          type: [String],
          default: [],
        },
      
        missingSkills: {
          type: [String],
          default: [],
        },
      
        suggestions: [
            {
              suggestion: {
                type: String,
                default: "",
              },
              rationale: {
                type: String,
                default: "",
              },
            },
          ],
      
        summary: {
          type: String,
          default: "",
        }
      
      },
  },
  {
    timestamps: true,
  }
);


export default mongoose.model("Student", studentSchema);