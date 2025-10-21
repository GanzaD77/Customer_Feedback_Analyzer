// Fix: Import `Type` for defining the response schema.
import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Fix: Replaced the manual text parsing logic with a more robust JSON schema approach.
// This resolves the original TypeScript error by ensuring the AI returns a structured object
// that matches the `AnalysisResult` type, eliminating the need for unsafe type casting.
export const analyzeFeedback = async (feedbackText: string): Promise<AnalysisResult> => {
  const model = 'gemini-2.5-flash';

  const systemInstruction = `
    ROLE:
    You are an advanced Customer Feedback Analyzer trained to understand emotions, detect key topics, and generate actionable insights from customer comments.

    TASK:
    Analyze the customer feedback and return a JSON object with your analysis.
    The analysis must include:
    1. Overall Sentiment
    2. Emotion Detected
    3. Main Topics
    4. Actionable Recommendation

    CONTEXT:
    The user will input real customer feedback or reviews. Interpret the tone, identify what matters most to the customer, and respond professionally and clearly.
  `;

  const prompt = `
    CUSTOMER FEEDBACK TO ANALYZE:
    ---
    ${feedbackText}
    ---
  `;

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      sentiment: {
        type: Type.STRING,
        description: 'Overall Sentiment — Positive, Neutral, or Negative.'
      },
      emotion: {
        type: Type.STRING,
        description: 'Emotion Detected — e.g., Happy, Frustrated, Satisfied, Disappointed, Excited.'
      },
      mainTopics: {
        type: Type.STRING,
        description: 'A comma-separated list of 2–3 key areas mentioned (e.g., Product Quality, Customer Service).'
      },
      recommendation: {
        type: Type.STRING,
        description: 'A 1–2 sentence actionable suggestion to improve the customer experience.'
      }
    },
    required: ['sentiment', 'emotion', 'mainTopics', 'recommendation']
  };


  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });
    
    const analysisText = response.text;
    if (!analysisText) {
      throw new Error("Received an empty response from the AI.");
    }
    
    return JSON.parse(analysisText);
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof SyntaxError) {
      throw new Error("Failed to parse the JSON response from the AI. The format was invalid.");
    }
    throw new Error("Failed to get a response from the AI model.");
  }
};
