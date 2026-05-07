
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { AnalysisResult, Severity } from "../types";

const API_KEY = process.env.API_KEY || "";

const getAI = () => {
  if (!API_KEY) throw new Error("API Key is missing.");
  return new GoogleGenAI({ apiKey: API_KEY });
};

export const analyzeLeafImage = async (base64Image: string): Promise<AnalysisResult> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        { inlineData: { mimeType: 'image/jpeg', data: base64Image.split(',')[1] || base64Image } },
        { text: "Expert plant pathologist analysis. JSON output only." }
      ],
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          plantName: { type: Type.STRING },
          diseaseName: { type: Type.STRING },
          confidence: { type: Type.NUMBER },
          severity: { type: Type.STRING },
          summary: { type: Type.STRING },
          symptoms: { type: Type.ARRAY, items: { type: Type.STRING } },
          treatment: {
            type: Type.OBJECT,
            properties: {
              organic: { type: Type.ARRAY, items: { type: Type.STRING } },
              chemical: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["organic", "chemical"]
          },
          prevention: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["plantName", "diseaseName", "confidence", "severity", "summary", "symptoms", "treatment", "prevention"]
      }
    }
  });
  return JSON.parse(response.text) as AnalysisResult;
};

export const getAgriAdvice = async (location: string, weather: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `As an agricultural expert, give a 2-sentence advice for a farmer in ${location} where the weather is ${weather}. Focus on crop safety.`
  });
  return response.text;
};

export const chatWithAssistant = async (history: {role: string, parts: {text: string}[]}[], message: string) => {
  const ai = getAI();
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: "You are AgroDetect AI Assistant. You help farmers with crop diseases, soil health, planting schedules, and market trends. Keep answers concise and practical for rural farmers.",
    }
  });
  const result = await chat.sendMessage({ message });
  return result.text;
};
