import axios from "axios";
import "dotenv/config";

const ai = {
  models: {
    generateContent: async ({ model, contents }) => {
      let prompt = "";

      if (typeof contents === "string") {
        prompt = contents;
      } else if (Array.isArray(contents)) {
        prompt = contents
          .map((item) => item.text || "")
          .join("\n");
      }

      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: model || "google/gemini-2.5-flash",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      return {
        text: response.data.choices[0].message.content,
      };
    },
  },
};

export default ai;