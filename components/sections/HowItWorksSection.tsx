import React from 'react';
import { HOW_IT_WORKS_STEPS } from '../../constants';

const HowItWorksSection: React.FC = () => {
  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-slate-100 dark:bg-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100">
            Get Started in Minutes
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Building and deploying AI agents with AgentFlow is simple and straightforward.
          </p>
        </div>
        <div className="relative">
          {/* Dotted line connector for larger screens */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 -mt-3">
            <svg width="100%" height="100%" className="overflow-visible">
              <line x1="15%" y1="50%" x2="85%" y2="50%" strokeDasharray="5,5" stroke="currentColor" className="text-slate-300 dark:text-slate-600" strokeWidth="2"/>
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
            {HOW_IT_WORKS_STEPS.map((step, index) => (
              <div key={step.id} className="relative flex flex-col items-center text-center p-6 bg-white dark:bg-slate-850 shadow-lg dark:shadow-xl dark:shadow-slate-900/40 rounded-lg">
                <div className="absolute -top-6 bg-sky-600 dark:bg-sky-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shadow-md">
                  {step.id}
                </div>
                <div className="mt-8 mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">{step.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;