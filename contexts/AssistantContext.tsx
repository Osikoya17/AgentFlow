
import React, { createContext, useState, ReactNode, useCallback, useEffect, useRef } from 'react';
import { AssistantContextType, ChatMessage } from '../types';
import { GeminiService } from '../services/GeminiService';
import type { Chat, GenerateContentResponse } from '@google/genai';

export const AssistantContext = createContext<AssistantContextType | undefined>(undefined);

interface AssistantProviderProps {
  children: ReactNode;
}

export const AssistantProvider: React.FC<AssistantProviderProps> = ({ children }) => {
  const [isAssistantOpen, setIsAssistantOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Use a ref for the chat session to avoid re-initialization on every render
  // and to ensure its methods are called on the same instance.
  const chatSessionRef = useRef<Chat | null>(null);

  useEffect(() => {
    // Initialize chat session when the provider mounts or if it becomes null
    if (!chatSessionRef.current) {
      try {
        chatSessionRef.current = GeminiService.startChat();
        // Add an initial greeting message from the AI
        setMessages([
          { 
            id: 'initial-greeting', 
            sender: 'ai', 
            text: "Hello! I'm your AgentFlow AI Assistant. How can I help you today?", 
            timestamp: new Date() 
          }
        ]);
      } catch (e) {
        console.error("Failed to initialize Gemini chat session:", e);
        setError("Could not start AI assistant. Please check API key and configuration.");
      }
    }
  }, []); // Empty dependency array means this runs once on mount

  const toggleAssistant = useCallback(() => {
    setIsAssistantOpen(prev => !prev);
    if (isAssistantOpen) setError(null); // Clear error when closing
  }, [isAssistantOpen]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;
    if (!chatSessionRef.current) {
      setError("AI Assistant is not available. Chat session not initialized.");
      console.error("Attempted to send message without an active chat session.");
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString() + '-user',
      sender: 'user',
      text,
      timestamp: new Date(),
    };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setIsLoading(true);
    setError(null);

    // Placeholder for streaming AI response
    const aiResponsePlaceholderId = Date.now().toString() + '-ai-stream';
    setMessages(prevMessages => [
        ...prevMessages,
        { id: aiResponsePlaceholderId, sender: 'ai', text: '', timestamp: new Date() }
    ]);

    try {
      let fullText = "";
      for await (const chunk of GeminiService.sendMessageStreamToGemini(chatSessionRef.current, text)) {
        const chunkText = chunk.text;
        if (chunkText) {
          fullText += chunkText;
          setMessages(prevMessages => 
            prevMessages.map(msg => 
              msg.id === aiResponsePlaceholderId ? { ...msg, text: fullText } : msg
            )
          );
        }
      }
      // Final update after stream is complete, in case of no text in last chunk.
      // This also ensures the message object has the final full text.
      setMessages(prevMessages => 
        prevMessages.map(msg => 
          msg.id === aiResponsePlaceholderId ? { ...msg, text: fullText, isLoading: false } : msg
        )
      );

    } catch (e) {
      console.error('Streaming API call failed:', e);
      const errMessage = e instanceof Error ? e.message : "An unknown error occurred during streaming.";
      setError(`AI Error: ${errMessage}`);
      setMessages(prevMessages => 
        prevMessages.map(msg => 
          msg.id === aiResponsePlaceholderId ? { ...msg, text: `Sorry, I encountered an error. (${errMessage})`, error: true, isLoading: false } : msg
        ).filter(msg => msg.id !== aiResponsePlaceholderId || msg.text ) // Remove empty placeholder on error
      );
    } finally {
      setIsLoading(false);
    }

  }, [chatSessionRef]); // chatSessionRef is stable

  return (
    <AssistantContext.Provider value={{ 
      isAssistantOpen, 
      toggleAssistant, 
      messages, 
      sendMessage, 
      isLoading, 
      error, 
      clearError,
      chatSession: chatSessionRef.current // Provide current session if needed by consumers (though actions are preferred)
    }}>
      {children}
    </AssistantContext.Provider>
  );
};
