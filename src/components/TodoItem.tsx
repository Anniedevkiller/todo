'use client';

import { useState, useRef, useEffect, KeyboardEvent, ChangeEvent } from 'react';
import { Todo } from '../lib/types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onEdit, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const handleStartEdit = () => {
    setEditText(todo.text);
    setIsEditing(true);
  };

  const handleSave = () => {
    const trimmed = editText.trim();
    if (trimmed !== todo.text) {
      onEdit(todo.id, trimmed);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <li
      className={`group relative flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800/80 last:border-b-0 transition-colors duration-150 ${
        todo.completed ? 'bg-slate-50/40 dark:bg-slate-900/40' : 'bg-white/60 dark:bg-slate-800/60'
      } hover:bg-slate-50 dark:hover:bg-slate-800/80`}
    >
      {isEditing ? (
        <div className="flex-1 mr-2">
          <input
            ref={inputRef}
            type="text"
            value={editText}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            aria-label={`Edit todo item: ${todo.text}`}
            className="w-full px-3 py-1.5 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-900 border border-indigo-500 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          />
        </div>
      ) : (
        <div className="flex items-center space-x-3 flex-1 min-w-0 mr-2">
          <button
            type="button"
            role="checkbox"
            aria-checked={todo.completed}
            aria-label={`Mark "${todo.text}" as ${todo.completed ? 'active' : 'completed'}`}
            onClick={() => onToggle(todo.id)}
            className={`flex items-center justify-center w-6 h-6 rounded-full border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
              todo.completed
                ? 'bg-gradient-to-tr from-indigo-500 to-violet-600 border-transparent text-white shadow-sm'
                : 'border-slate-300 dark:border-slate-600 hover:border-indigo-500'
            }`}
          >
            {todo.completed && (
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
          <span
            onDoubleClick={handleStartEdit}
            className={`text-base font-medium truncate select-none transition-all duration-200 cursor-pointer ${
              todo.completed
                ? 'line-through text-slate-400 dark:text-slate-500'
                : 'text-slate-700 dark:text-slate-200'
            }`}
          >
            {todo.text}
          </span>
        </div>
      )}

      <div className="flex items-center space-x-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200">
        {!isEditing && (
          <button
            type="button"
            onClick={handleStartEdit}
            aria-label={`Edit task "${todo.text}"`}
            className="p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
        )}
        <button
          type="button"
          onClick={() => onDelete(todo.id)}
          aria-label={`Delete task "${todo.text}"`}
          className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </li>
  );
}
