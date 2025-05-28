
import React, { useState, useContext, FormEvent } from 'react';
import { AssistantContext } from '../../contexts/AssistantContext';
import { PaperAirplaneIcon } from '../../constants';
import Button from '../ui/Button';

const MessageInput: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const { sendMessage, isLoading } = useContext(AssistantContext)!;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    sendMessage(inputText);
    setInputText('');
  };

  return (
    <form 
        onSubmit={handleSubmit} 
        className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900"
    >
      <div className="flex items-center space-x-2">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          placeholder="Type your message..."
          className="flex-grow p-2.5 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-slate-700 dark:text-slate-100 text-sm resize-none"
          rows={1} // Start with 1 row, can expand with content or CSS
          disabled={isLoading}
          aria-label="Chat message input"
        />
        <Button
          type="submit"
          variant="primary"
          size="md"
          className="!p-2.5" // Make it squarer
          disabled={isLoading || !inputText.trim()}
          aria-label="Send message"
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <PaperAirplaneIcon className="w-5 h-5" />
          )}
        </Button>
      </div>
    </form>
  );
};

export default MessageInput;
