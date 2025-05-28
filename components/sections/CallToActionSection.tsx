import React, { useContext } from 'react';
import Button from '../ui/Button';
import { NavigationContext } from '../../contexts/NavigationContext';

const CallToActionSection: React.FC = () => {
  const { navigateTo } = useContext(NavigationContext)!;
  return (
    <section className="py-20 bg-gradient-to-r from-sky-600 to-indigo-700 dark:from-sky-700 dark:to-indigo-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
          Ready to Revolutionize Your Workflows?
        </h2>
        <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto opacity-90">
          Join thousands of businesses leveraging AgentFlow to build intelligent AI agents, automate tasks, and drive growth.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button 
            variant="secondary" 
            size="lg" 
            className="bg-white text-sky-600 hover:bg-slate-100 focus:ring-white dark:bg-slate-100 dark:text-sky-700 dark:hover:bg-slate-200"
            onClick={() => navigateTo('signup')}
          >
            Start Your Free Trial
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-white text-white hover:bg-white hover:text-sky-600 focus:ring-white dark:hover:text-sky-700"
             onClick={() => console.log('Talk to sales clicked')} // Placeholder action
          >
            Talk to Sales
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;