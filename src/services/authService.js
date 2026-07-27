import api from "./api";

// Student Registration
export const registerStudent = async (studentData) => {
  const response = await api.post("/student/register", studentData);
  return response.data;
};

// Student Login
export const loginStudent = async (loginData) => {
  const response = await api.post("/student/login", loginData);
  return response.data;
};