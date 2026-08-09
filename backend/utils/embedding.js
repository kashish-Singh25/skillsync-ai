import { generateEmbedding } from "../services/embeddingService.js";

export const createEmbedding = async (text) => {

  if (!text) return [];

  return await generateEmbedding(text);

};