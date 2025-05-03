import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

// Shared chat session
let chat: any = null;

export const generateSafetyResponse = async (message: string) => {
  try {
    if (!chat) {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: "Hello" }],
          },
          {
            role: "model",
            parts: [{ text: "Hi! How can I assist you today?" }],
          },
        ],
        generationConfig: {
          temperature: 0.7,
        },
      });
    }

    const result = await chat.sendMessage(message);
    const response = result.response.text();

    return response || "Sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble reaching Gemini. Please try again later.";
  }
};
