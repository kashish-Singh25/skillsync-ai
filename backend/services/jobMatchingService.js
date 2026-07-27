import openrouter from "./openrouterService.js";

export const getJobMatchAnalysis = async (
  studentSkills,
  jobSkills,
  similarity
) => {
  try {
    const prompt = `
You are an AI Recruitment Assistant.

Similarity Score:
${similarity.toFixed(2)}%

Student Skills:
${(studentSkills || []).join(", ")}

Required Job Skills:
${(jobSkills || []).join(", ")}

Return ONLY valid JSON.

{
  "matchedSkills": [],
  "missingSkills": [],
  "reason": "",
  "recommendation": ""
}
`;

    const response = await openrouter.post("/chat/completions", {
      model: "meta-llama/llama-3.1-8b-instruct",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const text = response.data.choices[0].message.content;

    const clean = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(clean);
  } catch (err) {
    console.log("JOB MATCH AI ERROR");
    console.log(err);

    return {
      matchedSkills: [],
      missingSkills: [],
      reason: "AI analysis unavailable.",
      recommendation: "Average Fit",
    };
  }
};