import Student from "../models/Student.js";
import { createEmbedding } from "../services/embeddingService.js";
import { analyzeResumeWithAI } from "../services/resumeAnalyzerService.js";

export const analyzeResume = async (req, res) => {
  try {
    const { studentId } = req.body;

    const student = await Student.findById(studentId);

    console.log("Resume Text:");
console.log(student.resumeText);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    if (!student.resume) {
      return res.status(400).json({
        success: false,
        message: "Resume not uploaded",
      });
    }

    console.log("===== STUDENT =====");
    console.log(student.fullName);

    console.log("Resume URL:");
    console.log(student.resume);

    // Analyze Resume
const analysis = await analyzeResumeWithAI(student);

    // IMPORTANT: pass ONLY the resume URL
    const profileText = `
Candidate Profile

Name:
${student.fullName}

College:
${student.college}

Branch:
${student.branch}

Graduation Year:
${student.graduationYear}

Resume Summary:
${analysis.summary}

Technical Skills:
${(analysis.extractedSkills || []).join(", ")}

Student Skills:
${(student.skills || []).join(", ")}

Projects:
${(student.projects || []).join(", ")}

Strengths:
${(analysis.strengths || []).join(", ")}

Weaknesses:
${(analysis.weaknesses || []).join(", ")}

Missing Skills:
${(analysis.missingSkills || []).join(", ")}

Github:
${student.github}

LinkedIn:
${student.linkedin}

Suggestions:
${(analysis.suggestions || [])
  .map((s) => (typeof s === "string" ? s : s.label))
  .join(", ")}
`;

console.log("===== STUDENT PROFILE FOR EMBEDDING =====");
console.log(profileText);

const embedding = await createEmbedding(profileText);

analysis.suggestions = (analysis.suggestions || []).map((item) => {
    if (typeof item === "string") {
      return item;
    }
  
    return item.label || item.description || "";
  });    


student.aiAnalysis = analysis;
    student.embedding = embedding;

    console.log("Saving student...");

    await student.save();

    console.log("Student saved successfully");

    return res.status(200).json({
      success: true,
      analysis,
    });

  } catch (error) {

    console.log("========== RESUME AI ERROR ==========");

    console.log(error);

    console.log(error.message);

    console.log(error.stack);

    return res.status(500).json({
        success:false,
        message:error.message
    });

}
};