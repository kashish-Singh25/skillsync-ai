import axios from "axios";
import PDFParser from "pdf2json";

export const downloadResume = async (resumeUrl) => {
  try {
    console.log("Downloading Resume...");
    console.log(resumeUrl);

    // Download PDF as binary data
    const response = await axios.get(resumeUrl, {
      responseType: "arraybuffer",
    });

    const pdfBuffer = Buffer.from(response.data);

    console.log("PDF downloaded successfully");
    console.log("PDF size:", pdfBuffer.length);

    // Convert PDF into text
    const pdfParser = new PDFParser();

    const resumeText = await new Promise((resolve, reject) => {
      pdfParser.on("pdfParser_dataError", (error) => {
        reject(error);
      });

      pdfParser.on("pdfParser_dataReady", () => {
        try {
          const text = pdfParser.getRawTextContent();
          resolve(text);
        } catch (error) {
          reject(error);
        }
      });

      pdfParser.parseBuffer(pdfBuffer);
    });

    console.log("Resume text extracted successfully");
    console.log("Extracted text length:", resumeText.length);

    return resumeText;

  } catch (error) {
    console.log("Resume Download / Parsing Error:");
    console.log(error);

    throw error;
  }
};