import api from "./api";

// Get Student Profile
export const getStudentProfile = async () => {
  const response = await api.get("/student/profile");
  return response.data;
};

// Update Student Profile
export const updateStudentProfile = async (profileData) => {
  const response = await api.put("/student/profile", profileData);
  return response.data;
};