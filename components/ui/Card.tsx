import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div
      className={`bg-white dark:bg-slate-800 shadow-lg dark:shadow-xl dark:shadow-slate-900/40 rounded-xl p-6 transition-all duration-300 hover:shadow-xl dark:hover:shadow-sky-500/20 ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;