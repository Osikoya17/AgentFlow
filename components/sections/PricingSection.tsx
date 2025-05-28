import React, { useContext } from 'react';
import { PRICING_PLANS } from '../../constants';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { NavigationContext } from '../../contexts/NavigationContext';
import { Page, NavigationParams } from '../../types';

const CheckIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
  </svg>
);

const PricingSection: React.FC = () => {
  const { navigateTo } = useContext(NavigationContext)!;

  const handleCTAClick = (page?: Page, params?: NavigationParams) => {
    if (page) {
      navigateTo(page, params);
    } else {
      // Handle 'Contact Sales' - potentially a mailto or different page/modal
      // For now, we can navigate to home or a placeholder contact page if one existed
      console.log('Contact Sales clicked');
      // Example: navigateTo('contact');
    }
  };

  return (
    <section id="pricing" className="py-16 sm:py-24 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100">
            Flexible Plans for Every Need
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Choose the plan that's right for you and start building powerful AI agents today.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PRICING_PLANS.map((plan) => (
            <Card 
              key={plan.name} 
              className={`flex flex-col dark:bg-slate-800 ${plan.highlight ? 'border-2 border-sky-500 dark:border-sky-400 transform lg:scale-105 shadow-2xl dark:shadow-sky-500/30' : 'shadow-lg dark:shadow-xl dark:shadow-slate-900/40'}`}
            >
              {plan.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-sky-500 dark:bg-sky-400 text-white dark:text-slate-900 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              <div className="p-6 flex-grow">
                <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-2">{plan.name}</h3>
                <p className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-1">
                  {plan.price}
                  {plan.frequency && <span className="text-base font-normal text-slate-500 dark:text-slate-400">{plan.frequency}</span>}
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 h-10">{plan.name === 'Enterprise' ? 'Tailored for your organization\'s specific needs.' : `Perfect for ${plan.name.toLowerCase()} and growing teams.`}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <CheckIcon className="w-5 h-5 text-sky-500 dark:text-sky-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600 dark:text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 mt-auto">
                <Button 
                  variant={plan.highlight ? 'primary' : 'outline'} 
                  size="lg" 
                  className="w-full"
                  onClick={() => handleCTAClick(plan.actionPage, plan.actionParams)}
                >
                  {plan.ctaText}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
