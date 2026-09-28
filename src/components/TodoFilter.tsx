'use client';

import { FilterStatus } from '../lib/types';

interface TodoFilterProps {
  activeCount: number;
  completedCount: number;
  filter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
  onClearCompleted: () => void;
}

export function TodoFilter({
  activeCount,
  completedCount,
  filter,
  onFilterChange,
  onClearCompleted,
}: TodoFilterProps) {
  const itemText = activeCount === 1 ? 'item' : 'items';

  const filterOptions: { label: string; value: FilterStatus }[] = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Completed', value: 'completed' },
  ];

  return (
    <footer className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-slate-100 dark:border-slate-800 text-sm text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-900/50 rounded-b-xl">
      <span className="font-medium" aria-live="polite">
        {activeCount} {itemText} left
      </span>

      <nav aria-label="Filter tasks" className="flex items-center space-x-1">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onFilterChange(option.value)}
            aria-pressed={filter === option.value}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all duration-150 ${
              filter === option.value
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'hover:bg-slate-200/60 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            {option.label}
          </button>
        ))}
      </nav>

      {completedCount > 0 ? (
        <button
          type="button"
          onClick={onClearCompleted}
          className="hover:underline font-medium text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
        >
          Clear completed
        </button>
      ) : (
        <div className="hidden sm:block w-24" />
      )}
    </footer>
  );
}
