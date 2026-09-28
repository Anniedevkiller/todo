'use client';

import { useState, FormEvent, KeyboardEvent } from 'react';

interface TodoInputProps {
  onAdd: (text: string) => void;
  totalCount: number;
  allCompleted: boolean;
  onToggleAll: () => void;
}

export function TodoInput({ onAdd, totalCount, allCompleted, onToggleAll }: TodoInputProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex items-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl shadow-lg border border-slate-200/60 dark:border-slate-700/60 transition-all duration-200 focus-within:ring-2 focus-within:ring-indigo-500/50"
    >
      {totalCount > 0 && (
        <button
          type="button"
          onClick={onToggleAll}
          aria-label={allCompleted ? 'Mark all tasks as active' : 'Mark all tasks as completed'}
          aria-pressed={allCompleted}
          className={`px-4 py-4 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ${
            allCompleted ? 'text-indigo-600 dark:text-indigo-400' : ''
          }`}
        >
          <svg
            className="w-5 h-5 transform transition-transform duration-200 active:scale-95"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      )}
      <input
        id="new-todo-input"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="What needs to be done?"
        aria-label="Create a new todo item"
        className="w-full py-4 pr-4 pl-3 bg-transparent text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none font-medium text-lg"
      />
    </form>
  );
}
