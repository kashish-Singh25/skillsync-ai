import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY,
});

async function test() {
  try {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-pro",
        contents: "Say hello",
    });

    console.log(response.text);
  } catch (err) {
    console.error(err);
  }
}

test();