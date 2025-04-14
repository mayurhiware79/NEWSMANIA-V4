import { GoogleGenerativeAI } from "@google/generative-ai";

// Get API key from environment variable
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
if (!API_KEY) {
  console.error("Gemini API key is not set in environment variables");
}

const genAI = new GoogleGenerativeAI(API_KEY);

export const generateSummary = async (article) => {
  try {
    if (!article.title || !article.description) {
      throw new Error("Article data is incomplete");
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const prompt = `Please provide a concise 2-4 line summary of the following news article. Focus on the key points and maintain a neutral tone:

    Title: ${article.title}
    Description: ${article.description || article.content}
    
    Summary:`;

    console.log("Generating summary for:", article.title);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log("Generated summary:", text);
    return text;
  } catch (error) {
    console.error("Error generating summary:", error);
    return "Unable to generate summary at this time. Please try again.";
  }
};

export const generatePerspectives = async (article) => {
  try {
    if (!article.title || !article.description) {
      throw new Error("Article data is incomplete");
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const prompt = `Analyze the following news article and provide 3 different perspectives in bullet points. Each perspective should be from a different viewpoint (e.g., economic, social, political, environmental):

    Title: ${article.title}
    Description: ${article.description || article.content}
    
    Perspectives:`;

    console.log("Generating perspectives for:", article.title);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log("Generated perspectives:", text);
    return text;
  } catch (error) {
    console.error("Error generating perspectives:", error);
    return "Unable to generate perspectives at this time. Please try again.";
  }
};
