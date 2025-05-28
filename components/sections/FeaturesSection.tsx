import React from 'react';
import { FEATURES_DATA } from '../../constants';
import Card from '../ui/Card';

const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-16 sm:py-24 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100">
            Unlock the Power of AI Agents
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            AgentFlow provides a comprehensive suite of tools to build, manage, and optimize your AI workforce.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES_DATA.map((feature) => (
            <Card key={feature.title} className="text-center dark:bg-slate-800">
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;