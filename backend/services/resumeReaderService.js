import axios from "axios";

export const downloadResume = async (resumeUrl) => {
  try {
    console.log("Downloading Resume...");
    console.log(resumeUrl);

    const response = await axios.get(resumeUrl, {
      responseType: "text",
    });

    return response.data;

  } catch (error) {
    console.log("Resume Download Error:");
    console.log(error);

    throw error;
  }
};