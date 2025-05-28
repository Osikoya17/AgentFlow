
import React, { useContext, useEffect, useRef } from 'react';
import { AssistantContext } from '../../contexts/AssistantContext';
import { ChatMessage } from '../../types';
import { ChipIcon, UsersIcon } from '../../constants'; // User icon for user

const MessageList: React.FC = () => {
  const { messages, isLoading } = useContext(AssistantContext)!;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const formatTimestamp = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex-grow p-4 space-y-4 overflow-y-auto bg-slate-50 dark:bg-slate-850/50">
      {messages.map((msg: ChatMessage) => (
        <div
          key={msg.id}
          className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          {msg.sender === 'ai' && (
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-sky-500 dark:bg-sky-600 flex items-center justify-center self-start">
              <ChipIcon className="w-5 h-5 text-white" />
            </div>
          )}
          <div
            className={`max-w-[70%] p-3 rounded-xl shadow-sm ${
              msg.sender === 'user'
                ? 'bg-sky-500 text-white rounded-br-none'
                : msg.error 
                  ? 'bg-red-100 dark:bg-red-700/50 text-red-700 dark:text-red-200 border border-red-200 dark:border-red-600 rounded-bl-none'
                  : 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-bl-none'
            }`}
          >
            <p className="text-sm whitespace-pre-wrap">{msg.text || (msg.sender === 'ai' && isLoading && msg.id.endsWith('-ai-stream') ? 'Thinking...' : '')}</p>
            <span className={`text-xs mt-1 block ${msg.sender === 'user' ? 'text-sky-200 text-right' : msg.error ? 'text-red-400 dark:text-red-300' : 'text-slate-400 dark:text-slate-500'}`}>
              {formatTimestamp(msg.timestamp)}
            </span>
          </div>
           {msg.sender === 'user' && (
             <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-600 dark:bg-slate-500 flex items-center justify-center self-start">
               <UsersIcon className="w-5 h-5 text-white" />
             </div>
           )}
        </div>
      ))}
      {isLoading && !messages.find(m => m.id.endsWith('-ai-stream') && m.sender === 'ai' && !m.text) && ( // General loading indicator if not streaming
        <div className="flex justify-start items-center gap-2">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-sky-500 dark:bg-sky-600 flex items-center justify-center">
              <ChipIcon className="w-5 h-5 text-white" />
            </div>
          <div className="p-3 rounded-xl shadow-sm bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-bl-none">
            <p className="text-sm italic">AI is thinking...</p>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
