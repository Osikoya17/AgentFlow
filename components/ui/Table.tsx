
import React from 'react';
import { TableColumn } from '../../types'; // Import TableColumn from global types

interface TableProps<T extends { id: string | number }> { // Ensure T has an id property
  columns: TableColumn<T>[];
  data: T[];
  isLoading?: boolean;
  onRowClick?: (item: T) => void;
  className?: string;
  emptyStateMessage?: string;
}

const Table = <T extends { id: string | number }>({ 
  columns, 
  data, 
  isLoading = false, 
  onRowClick,
  className = '',
  emptyStateMessage = "No data available."
}: TableProps<T>) => {
  return (
    <div className={`overflow-x-auto shadow-md sm:rounded-lg bg-white dark:bg-slate-800 ${className}`}>
      <table className="w-full text-sm text-left text-slate-500 dark:text-slate-400">
        <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-700 dark:text-slate-300">
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)} scope="col" className={`px-6 py-3 ${col.className || ''}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-4 text-center">
                <div className="animate-pulse">Loading data...</div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-4 text-center text-slate-600 dark:text-slate-400">
                {emptyStateMessage}
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr 
                key={item.id} 
                className={`border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600/30 transition-colors duration-150 ${onRowClick ? 'cursor-pointer' : ''}`}
                onClick={() => onRowClick?.(item)}
              >
                {columns.map((col) => (
                  <td key={`${item.id}-${String(col.key)}`} className={`px-6 py-4 ${col.cellClassName || ''}`}>
                    {col.render ? col.render(item) : String(item[col.key as keyof T] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
