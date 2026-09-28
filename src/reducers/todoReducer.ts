import { Todo, TodoAction } from '../lib/types';

export function todoReducer(state: Todo[], action: TodoAction): Todo[] {
  switch (action.type) {
    case 'ADD_TODO': {
      const trimmed = action.payload.trim();
      if (!trimmed) return state;
      const newTodo: Todo = {
        id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
        text: trimmed,
        completed: false,
        createdAt: Date.now(),
      };
      return [newTodo, ...state];
    }

    case 'EDIT_TODO': {
      const trimmed = action.payload.text.trim();
      if (!trimmed) {
        return state.filter((t) => t.id !== action.payload.id);
      }
      return state.map((t) => (t.id === action.payload.id ? { ...t, text: trimmed } : t));
    }

    case 'TOGGLE_TODO': {
      return state.map((t) => (t.id === action.payload ? { ...t, completed: !t.completed } : t));
    }

    case 'DELETE_TODO': {
      return state.filter((t) => t.id !== action.payload);
    }

    case 'TOGGLE_ALL': {
      const targetState =
        action.payload !== undefined ? action.payload : !state.every((t) => t.completed);
      return state.map((t) => ({ ...t, completed: targetState }));
    }

    case 'CLEAR_COMPLETED': {
      return state.filter((t) => !t.completed);
    }

    case 'SET_TODOS': {
      return action.payload;
    }

    default:
      return state;
  }
}
