import openrouter from "./openrouterService.js";

export const analyzeResumeWithAI = async (student) => {
  try {

    const prompt = `
You are a Senior ATS Resume Reviewer and Placement Expert.

Analyze the student's profile and estimate how strong the candidate is for Software Engineering internships and placements.

IMPORTANT RULES:

1. Return ONLY valid JSON.
2. Do NOT write markdown.
3. Do NOT use code blocks.
4. Never return empty arrays.
5. Resume score must be between 60 and 95.
6. Always provide:
   - 4 strengths
   - 4 weaknesses
   - 5 missing skills
   - 5 suggestions
7. Suggestions must be simple strings.

Student Profile:

Name: ${student.fullName}

College: ${student.college}

Branch: ${student.branch}

Graduation Year: ${student.graduationYear}

Skills:
${(student.skills || []).join(", ")}

Projects:
${(student.projects || []).join(", ")}

Github:
${student.github}

LinkedIn:
${student.linkedin}

Return exactly this JSON:

{
  "resumeScore": 0,
  "summary": "",
  "extractedSkills": [],
  "education": [],
  "experience": [],
  "certifications": [],
  "strengths": [],
  "weaknesses": [],
  "missingSkills": [],
  "suggestions": []
}
`;
    const response = await openrouter.post("/chat/completions", {
      model: "meta-llama/llama-3.1-8b-instruct",
      temperature: 0,

      response_format: {
        type: "json_object",
      },

      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const text = response.data.choices[0].message.content;

    console.log("===== RAW AI RESPONSE =====");
    console.log(text);

    const json = text.substring(
      text.indexOf("{"),
      text.lastIndexOf("}") + 1
    );

    const clean = json
      .replace(/[\u0000-\u001F]+/g, " ")
      .trim();

    console.log("===== CLEAN JSON =====");
    console.log(clean);

    try {
        const result = JSON.parse(clean);

        // Never allow empty arrays
        
        if (!result.strengths || result.strengths.length === 0) {
          result.strengths = [
            "Strong academic background",
            "Good technical foundation",
            "Hands-on project experience",
            "Active learner with development skills"
          ];
        }
        
        if (!result.weaknesses || result.weaknesses.length === 0) {
          result.weaknesses = [
            "Needs more real-world internship experience",
            "Can improve coding consistency",
            "Portfolio can be expanded",
            "More advanced projects recommended"
          ];
        }
        
        if (!result.missingSkills || result.missingSkills.length === 0) {
          result.missingSkills = [
            "Data Structures & Algorithms",
            "System Design",
            "SQL",
            "AWS",
            "Docker"
          ];
        }
        
        if (!result.suggestions || result.suggestions.length === 0) {
          result.suggestions = [
            "Improve your GitHub profile.",
            "Build more full-stack projects.",
            "Practice DSA daily.",
            "Add internship experience.",
            "Earn relevant certifications."
          ];
        }
        
        if (!result.resumeScore || result.resumeScore < 60) {
          result.resumeScore = 78;
        }
        
        return result;
    } catch (err) {

      console.log("Invalid JSON from AI");
      console.log(err);

      return {
        resumeScore: 0,
        summary: "AI generated an invalid response. Please try again.",
        extractedSkills: [],
        education: [],
        experience: [],
        certifications: [],
        strengths: [],
        weaknesses: [],
        missingSkills: [],
        suggestions: [],
      };
    }

  } catch (err) {
    console.log(err);

    return {
      resumeScore: 0,
      summary: "Unable to analyze resume.",
      extractedSkills: [],
      education: [],
      experience: [],
      certifications: [],
      strengths: [],
      weaknesses: [],
      missingSkills: [],
      suggestions: [],
    };
  }
};