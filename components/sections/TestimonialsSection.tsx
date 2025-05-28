import React from 'react';
import { TESTIMONIALS_DATA } from '../../constants';
import Card from '../ui/Card';

const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-slate-100 dark:bg-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100">
            Loved by Innovators
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Hear what our customers have to say about AgentFlow.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((testimonial, index) => (
            <Card key={index} className="flex flex-col dark:bg-slate-850">
              <blockquote className="text-slate-600 dark:text-slate-400 italic mb-6 flex-grow">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center mt-auto">
                <img 
                  src={testimonial.avatarUrl} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">{testimonial.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;