
import React, { useContext } from 'react';
import { AssistantContext } from '../../contexts/AssistantContext';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { XMarkIcon, ChipIcon } from '../../constants'; // Assuming ChipIcon for AI logo

const AssistantPanel: React.FC = () => {
  const { toggleAssistant, error, clearError } = useContext(AssistantContext)!;

  return (
    <div 
      className="fixed bottom-24 right-6 sm:bottom-6 sm:right-24 w-[calc(100%-3rem)] max-w-md h-[70vh] max-h-[600px] bg-white dark:bg-slate-800 shadow-2xl rounded-xl flex flex-col overflow-hidden border border-slate-200 dark:border-slate-700 z-[90]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="assistant-panel-title"
    >
      <header className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
        <div className="flex items-center">
          <ChipIcon className="w-7 h-7 text-sky-600 dark:text-sky-400 mr-2" />
          <h2 id="assistant-panel-title" className="text-lg font-semibold text-slate-800 dark:text-slate-100">
            AI Assistant
          </h2>
        </div>
        <button
          onClick={toggleAssistant}
          className="p-1.5 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
          aria-label="Close assistant panel"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      </header>

      {error && (
        <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm flex justify-between items-center">
          <span>{error}</span>
          <button onClick={clearError} className="text-red-500 dark:text-red-400 hover:underline font-semibold text-xs">Dismiss</button>
        </div>
      )}

      <MessageList />
      <MessageInput />
    </div>
  );
};

export default AssistantPanel;
