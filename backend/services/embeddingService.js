import { HfInference } from "@huggingface/inference";
import "dotenv/config";

const hf = new HfInference(process.env.HF_TOKEN);

export const createEmbedding = async (text) => {
  try {

    const embedding = await hf.featureExtraction({
      model: "sentence-transformers/all-MiniLM-L6-v2",
      inputs: text,
    });

    console.log("Embedding Generated");

    return embedding;

  } catch (error) {

    console.log("===== EMBEDDING ERROR =====");

    console.log(error);

    throw error;

  }
};