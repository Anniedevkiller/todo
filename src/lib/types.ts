export type FilterStatus = 'all' | 'active' | 'completed';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

export type TodoAction =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'EDIT_TODO'; payload: { id: string; text: string } }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'DELETE_TODO'; payload: string }
  | { type: 'TOGGLE_ALL'; payload?: boolean }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'SET_TODOS'; payload: Todo[] };
