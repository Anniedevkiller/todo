'use client';

import { useReducer, useEffect, useState, useMemo, useCallback, useSyncExternalStore } from 'react';
import { todoReducer } from '../reducers/todoReducer';
import { localStorageAdapter, StorageAdapter } from '../lib/storage';
import { FilterStatus, Todo } from '../lib/types';

const STORAGE_KEY = 'next_todos_v1';

const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function useTodos(adapter: StorageAdapter = localStorageAdapter) {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [filter, setFilter] = useState<FilterStatus>('all');

  const isHydrated = useSyncExternalStore(emptySubscribe, getClientSnapshot, getServerSnapshot);

  // Load stored todos from adapter after hydration
  useEffect(() => {
    if (!isHydrated) return;
    const saved = adapter.getItem<Todo[]>(STORAGE_KEY);
    if (saved && Array.isArray(saved)) {
      dispatch({ type: 'SET_TODOS', payload: saved });
    }
  }, [adapter, isHydrated]);

  // Persist state to storage adapter on changes after initial load
  useEffect(() => {
    if (isHydrated) {
      adapter.setItem(STORAGE_KEY, todos);
    }
  }, [todos, isHydrated, adapter]);

  const addTodo = useCallback((text: string) => {
    dispatch({ type: 'ADD_TODO', payload: text });
  }, []);

  const editTodo = useCallback((id: string, text: string) => {
    dispatch({ type: 'EDIT_TODO', payload: { id, text } });
  }, []);

  const toggleTodo = useCallback((id: string) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  }, []);

  const deleteTodo = useCallback((id: string) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  }, []);

  const toggleAll = useCallback((completed?: boolean) => {
    dispatch({ type: 'TOGGLE_ALL', payload: completed });
  }, []);

  const clearCompleted = useCallback(() => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  }, []);

  const activeCount = useMemo(() => todos.filter((t) => !t.completed).length, [todos]);
  const completedCount = useMemo(() => todos.filter((t) => t.completed).length, [todos]);
  const totalCount = todos.length;

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter((t) => !t.completed);
      case 'completed':
        return todos.filter((t) => t.completed);
      case 'all':
      default:
        return todos;
    }
  }, [todos, filter]);

  return {
    todos,
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
  };
}
