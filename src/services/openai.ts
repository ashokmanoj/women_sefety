import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Only use this if absolutely necessary
});

export const generateSafetyResponse = async (message: string): Promise<string> => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful safety assistant focused on providing guidance and support for personal safety concerns. Provide clear, concise, and practical advice.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    return completion.choices[0]?.message?.content || 
      "I apologize, but I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Error generating AI response:", error);
    return "I'm sorry, but I'm having trouble connecting to the AI service. Please try again later.";
  }
};
