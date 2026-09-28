import { describe, it, expect } from 'vitest';
import { todoReducer } from '../reducers/todoReducer';
import { Todo } from '../lib/types';

describe('todoReducer', () => {
  const initialTodos: Todo[] = [
    { id: '1', text: 'First task', completed: false, createdAt: 1000 },
    { id: '2', text: 'Second task', completed: true, createdAt: 2000 },
  ];

  it('adds a new todo at the start of the list', () => {
    const state = todoReducer(initialTodos, { type: 'ADD_TODO', payload: 'New task' });
    expect(state.length).toBe(3);
    expect(state[0].text).toBe('New task');
    expect(state[0].completed).toBe(false);
  });

  it('ignores empty or whitespace-only ADD_TODO', () => {
    const state = todoReducer(initialTodos, { type: 'ADD_TODO', payload: '   ' });
    expect(state).toEqual(initialTodos);
  });

  it('toggles completion status of a todo', () => {
    const state = todoReducer(initialTodos, { type: 'TOGGLE_TODO', payload: '1' });
    expect(state.find((t) => t.id === '1')?.completed).toBe(true);
  });

  it('edits todo text correctly when trimmed', () => {
    const state = todoReducer(initialTodos, {
      type: 'EDIT_TODO',
      payload: { id: '1', text: ' Updated task ' },
    });
    expect(state.find((t) => t.id === '1')?.text).toBe('Updated task');
  });

  it('deletes todo if edited to empty text', () => {
    const state = todoReducer(initialTodos, {
      type: 'EDIT_TODO',
      payload: { id: '1', text: '   ' },
    });
    expect(state.find((t) => t.id === '1')).toBeUndefined();
    expect(state.length).toBe(1);
  });

  it('deletes a todo by id', () => {
    const state = todoReducer(initialTodos, { type: 'DELETE_TODO', payload: '2' });
    expect(state.length).toBe(1);
    expect(state[0].id).toBe('1');
  });

  it('toggles all completed state', () => {
    const stateAllDone = todoReducer(initialTodos, { type: 'TOGGLE_ALL', payload: true });
    expect(stateAllDone.every((t) => t.completed)).toBe(true);

    const stateAllActive = todoReducer(initialTodos, { type: 'TOGGLE_ALL', payload: false });
    expect(stateAllActive.every((t) => !t.completed)).toBe(true);

    const autoToggle = todoReducer(initialTodos, { type: 'TOGGLE_ALL' });
    expect(autoToggle.every((t) => t.completed)).toBe(true);
  });

  it('clears completed todos', () => {
    const state = todoReducer(initialTodos, { type: 'CLEAR_COMPLETED' });
    expect(state.length).toBe(1);
    expect(state[0].id).toBe('1');
  });

  it('sets todos array', () => {
    const newTodos: Todo[] = [{ id: '9', text: 'Loaded', completed: false, createdAt: 999 }];
    const state = todoReducer(initialTodos, { type: 'SET_TODOS', payload: newTodos });
    expect(state).toEqual(newTodos);
  });
});
