
import React, { useContext } from 'react';
import Button from '../ui/Button';
import { NavigationContext } from '../../contexts/NavigationContext';

const HeroSection: React.FC = () => {
  const { navigateTo } = useContext(NavigationContext)!;

  return (
    <section className="bg-gradient-to-br from-sky-50 via-slate-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-slate-100 leading-tight">
          Automate, Innovate, Elevate with
          <span className="block text-sky-600 dark:text-sky-400 mt-2">AgentFlow AI</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-slate-600 dark:text-slate-300">
          The ultimate platform for building, deploying, and managing intelligent AI agents. Streamline workflows, enhance customer experiences, and unlock new levels of productivity.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button variant="primary" size="lg" onClick={() => navigateTo('home', undefined, 'features')}>
            Discover Features
          </Button>
          <Button variant="outline" size="lg" onClick={() => navigateTo('signup')}>
            Get Started Free
          </Button>
        </div>
        {/* Image removed as per request */}
      </div>
    </section>
  );
};

export default HeroSection;
