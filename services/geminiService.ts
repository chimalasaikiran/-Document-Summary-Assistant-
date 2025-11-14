
import { GoogleGenAI } from "@google/genai";
import { SummaryLength } from '../types';

const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result.split(',')[1]);
      } else {
        resolve(''); // Should not happen with readAsDataURL
      }
    };
    reader.readAsDataURL(file);
  });
  const base64EncodedData = await base64EncodedDataPromise;
  return {
    inlineData: {
      data: base64EncodedData,
      mimeType: file.type,
    },
  };
};

export const generateSummary = async (file: File, length: SummaryLength): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API key not found. Please set the API_KEY environment variable.");
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const filePart = await fileToGenerativePart(file);
    const prompt = `Please provide a ${length} summary of the attached document. The summary should highlight key points and main ideas, capturing the essential information. Present the summary in clean, well-structured markdown.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [filePart, { text: prompt }] },
    });

    return response.text;
  } catch (error) {
    console.error("Error generating summary:", error);
    if (error instanceof Error) {
        return `An error occurred while generating the summary: ${error.message}. Please check the console for more details.`;
    }
    return "An unknown error occurred while generating the summary.";
  }
};
