
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from '../types';

const API_KEY = process.env.API_KEY;
const MODEL_NAME = 'gemini-2.5-flash-preview-04-17';

if (!API_KEY) {
  console.error("API_KEY for Gemini is not set in environment variables.");
  // Potentially throw an error or have a more robust error handling/fallback
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const GeminiService = {
  startChat: (): Chat => {
    const chatConfig = {
        // systemInstruction: "You are a helpful AI assistant for the AgentFlow platform. Be concise and informative.",
        // Add other config like temperature, topK if needed
    };
    return ai.chats.create({
        model: MODEL_NAME,
        config: chatConfig,
    });
  },

  sendMessageToGemini: async (chatSession: Chat, messageText: string): Promise<ChatMessage> => {
    try {
      const response: GenerateContentResponse = await chatSession.sendMessage({ message: messageText });
      const aiText = response.text;
      
      if (!aiText) {
        console.error("Gemini API returned an empty text response", response);
        return {
          id: Date.now().toString() + '-ai-error',
          sender: 'ai',
          text: 'Sorry, I could not process that. The response was empty.',
          timestamp: new Date(),
          error: true,
        };
      }

      return {
        id: Date.now().toString() + '-ai',
        sender: 'ai',
        text: aiText,
        timestamp: new Date(),
      };
    } catch (error) {
      console.error('Error sending message to Gemini:', error);
      let errorMessage = 'An error occurred while contacting the AI.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      // Check for specific GoogleGenAIError if needed for more granular messages
      return {
        id: Date.now().toString() + '-ai-error',
        sender: 'ai',
        text: `Sorry, I encountered an error: ${errorMessage}`,
        timestamp: new Date(),
        error: true,
      };
    }
  },

  sendMessageStreamToGemini: async function* (
    chatSession: Chat, 
    messageText: string
  ): AsyncGenerator<GenerateContentResponse, void, undefined> {
    try {
      const stream = await chatSession.sendMessageStream({ message: messageText });
      for await (const chunk of stream) {
        yield chunk;
      }
    } catch (error) {
      console.error('Error sending streaming message to Gemini:', error);
      // In a real app, you might want to yield an error object or handle it differently
      // For now, the error is logged, and the generator will complete.
      // The UI calling this should also have try-catch.
      throw error; // Re-throw to be caught by the caller
    }
  }
};
