import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
let genAI;

const getGenAI = () => {
  if (!genAI) {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not defined in environment variables');
    }
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }
  return genAI;
};

// Get the generative model
export const getGeminiModel = () => {
  const ai = getGenAI();
  return ai.getGenerativeModel({ model: 'gemini-flash-latest' });
};

// Generate AI response
export const generateAIResponse = async (prompt) => {
  try {
    const model = getGeminiModel();
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error('Gemini AI Error:', error);

    // Check for quota exceeded error (429)
    if (error.status === 429 || (error.message && error.message.includes('quota'))) {
      throw new Error('AI_QUOTA_EXCEEDED');
    }

    throw new Error('Failed to generate AI response');
  }
};

// Generate structured AI response (returns JSON)
export const generateStructuredAIResponse = async (prompt) => {
  try {
    const response = await generateAIResponse(prompt);
    // Try to parse as JSON, if fails return as text
    try {
      return JSON.parse(response);
    } catch {
      return { content: response };
    }
  } catch (error) {
    throw error;
  }
};

