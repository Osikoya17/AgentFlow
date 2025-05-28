import React from 'react';
import { KpiCardData } from '../../types';
import Card from '../ui/Card';

interface KpiCardProps {
  data: KpiCardData;
  className?: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ data, className }) => {
  return (
    <Card className={`!p-4 md:!p-6 ${className}`}>
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{data.title}</h3>
        {data.icon && <div className="text-sky-500 dark:text-sky-400">{data.icon}</div>}
      </div>
      <p className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100">{data.value}</p>
      {data.trend && <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{data.trend}</p>}
    </Card>
  );
};

export default KpiCard;
