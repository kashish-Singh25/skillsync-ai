import openrouter from "./openrouterService.js";
import { createEmbedding } from "./embeddingService.js";

export const analyzeJob = async (job) => {

  const prompt = `
You are an HR Recruitment AI.

Analyze this job.

Title:
${job.title}

Description:
${job.description}

Skills:
${(job.skills || []).join(",")}

IMPORTANT:
Return ONLY valid JSON.
Do not write explanations.
Do not write "Here's the analysis".
Do not use markdown.

{
  "jobSummary":"",
  "requiredSkills":[],
  "prioritySkills":[]
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

  console.log("===== RAW AI RESPONSE =====");
  console.log(text);

  // Extract JSON only
  const json = text.substring(
    text.indexOf("{"),
    text.lastIndexOf("}") + 1
  );

  console.log("===== EXTRACTED JSON =====");
  console.log(json);

  const result = JSON.parse(json);

  const jobProfile = `
Job Title:
${job.title}

Job Summary:
${result.jobSummary}

Job Description:
${job.description}

Required Skills:
${(result.requiredSkills || []).join(", ")}

Priority Skills:
${(result.prioritySkills || []).join(", ")}

Other Skills:
${(job.skills || []).join(", ")}
`;

console.log("===== JOB PROFILE FOR EMBEDDING =====");
console.log(jobProfile);

const embedding = await createEmbedding(jobProfile);

  return {
    ...result,
    embedding,
  };
};