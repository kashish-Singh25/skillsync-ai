import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-skillsync-ai-2.onrender.com/api",
});

export default api;