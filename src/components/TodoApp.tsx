'use client';

import { useTodos } from '../hooks/useTodos';
import { TodoInput } from './TodoInput';
import { TodoList } from './TodoList';
import { TodoFilter } from './TodoFilter';

export function TodoApp() {
  const {
    filteredTodos,
    filter,
    setFilter,
    isHydrated,
    activeCount,
    completedCount,
    totalCount,
    addTodo,
    editTodo,
    toggleTodo,
    deleteTodo,
    toggleAll,
    clearCompleted,
  } = useTodos();

  const allCompleted = totalCount > 0 && activeCount === 0;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <header className="text-center space-y-2">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          todos
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
          Manage your tasks cleanly & efficiently
        </p>
      </header>

      <main className="space-y-4">
        <TodoInput
          onAdd={addTodo}
          totalCount={totalCount}
          allCompleted={allCompleted}
          onToggleAll={() => toggleAll()}
        />

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl shadow-xl border border-slate-200/60 dark:border-slate-700/60 overflow-hidden transition-all duration-200">
          {!isHydrated ? (
            <div className="p-8 text-center text-slate-400 animate-pulse">
              Loading tasks...
            </div>
          ) : (
            <>
              <TodoList
                todos={filteredTodos}
                onToggle={toggleTodo}
                onEdit={editTodo}
                onDelete={deleteTodo}
              />
              {totalCount > 0 && (
                <TodoFilter
                  activeCount={activeCount}
                  completedCount={completedCount}
                  filter={filter}
                  onFilterChange={setFilter}
                  onClearCompleted={clearCompleted}
                />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
