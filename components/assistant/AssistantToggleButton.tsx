
import React, { useContext } from 'react';
import { AssistantContext } from '../../contexts/AssistantContext';
import { ChatBubbleLeftRightIcon, XMarkIcon } from '../../constants';

const AssistantToggleButton: React.FC = () => {
  const { isAssistantOpen, toggleAssistant, messages } = useContext(AssistantContext)!;

  // Basic notification badge (e.g., unread messages, though not fully implemented here)
  // For simplicity, let's say if there are messages and it's closed, show a dot.
  const hasUnread = !isAssistantOpen && messages.length > 1; // More than initial greeting

  return (
    <button
      onClick={toggleAssistant}
      className="fixed bottom-6 right-6 bg-sky-600 dark:bg-sky-500 text-white p-4 rounded-full shadow-xl hover:bg-sky-700 dark:hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 transition-transform duration-200 ease-in-out hover:scale-110 z-[100]"
      aria-label={isAssistantOpen ? "Close AI Assistant" : "Open AI Assistant"}
      aria-expanded={isAssistantOpen}
    >
      {isAssistantOpen ? (
        <XMarkIcon className="w-7 h-7" />
      ) : (
        <ChatBubbleLeftRightIcon className="w-7 h-7" />
      )}
      {hasUnread && !isAssistantOpen && (
        <span className="absolute top-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-red-500" />
      )}
    </button>
  );
};

export default AssistantToggleButton;
