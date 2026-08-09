import axios from "axios";

const api = axios.create({
  // baseURL: "https://backend-skillsync-ai-2.onrender.com/api",
  baseURL: "http://localhost:5000/api",
});

export default api;