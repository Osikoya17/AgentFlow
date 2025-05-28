import React from 'react';
import { BarChartDataItem } from '../../types';

interface SimpleBarChartProps {
  data: BarChartDataItem[];
  title?: string;
  barColor?: string; // Default color if not specified in data item
  className?: string;
}

const SimpleBarChart: React.FC<SimpleBarChartProps> = ({ 
  data, 
  title, 
  barColor = 'bg-sky-500', 
  className = '' 
}) => {
  if (!data || data.length === 0) {
    return (
      <div className={`p-4 bg-white dark:bg-slate-800 rounded-lg shadow ${className}`}>
        {title && <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-2">{title}</h3>}
        <p className="text-slate-500 dark:text-slate-400">No data available for chart.</p>
      </div>
    );
  }

  const maxValue = Math.max(...data.map(item => item.value), 0);

  return (
    <div className={`p-4 bg-white dark:bg-slate-800 rounded-lg shadow ${className}`}>
      {title && <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-4">{title}</h3>}
      <div className="flex items-end space-x-2 h-64 border-l border-b border-slate-300 dark:border-slate-600 p-2">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center justify-end">
            <div 
              className={`w-full rounded-t-sm transition-all duration-300 ease-out ${item.color || barColor}`}
              style={{ height: maxValue > 0 ? `${(item.value / maxValue) * 100}%` : '0%' }}
              title={`${item.label}: ${item.value}`}
            >
               <span className="sr-only">{`${item.label}: ${item.value}`}</span>
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400 mt-1 truncate w-full text-center" title={item.label}>
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimpleBarChart;
