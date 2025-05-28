import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { SunIcon, MoonIcon } from '../../constants'; // Assuming you'll add these icons to constants

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)!;

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400"
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? (
        <MoonIcon className="w-5 h-5" />
      ) : (
        <SunIcon className="w-5 h-5" />
      )}
    </button>
  );
};

export default ThemeToggle;