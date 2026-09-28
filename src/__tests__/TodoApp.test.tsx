import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import userEvent from '@testing-library/user-event';
import { TodoApp } from '../components/TodoApp';

describe('TodoApp Integration Tests', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders correctly and allows adding a new todo item', async () => {
    const user = userEvent.setup();
    render(<TodoApp />);

    const input = screen.getByRole('textbox', { name: /create a new todo item/i });
    expect(input).toBeInTheDocument();

    await user.type(input, 'Buy groceries{enter}');

    expect(screen.getByText('Buy groceries')).toBeInTheDocument();
    expect(screen.getByText('1 item left')).toBeInTheDocument();
  });

  it('toggles todo completion status', async () => {
    const user = userEvent.setup();
    render(<TodoApp />);

    const input = screen.getByRole('textbox', { name: /create a new todo item/i });
    await user.type(input, 'Task to complete{enter}');

    const checkbox = screen.getByRole('checkbox', { name: /mark "task to complete" as completed/i });
    await user.click(checkbox);

    expect(screen.getByText('0 items left')).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('aria-checked', 'true');
  });

  it('allows inline editing via edit button and keyboard save (Enter)', async () => {
    const user = userEvent.setup();
    render(<TodoApp />);

    const input = screen.getByRole('textbox', { name: /create a new todo item/i });
    await user.type(input, 'Original Task{enter}');

    const editBtn = screen.getByRole('button', { name: /edit task "original task"/i });
    await user.click(editBtn);

    const editInput = screen.getByRole('textbox', { name: /edit todo item/i });
    expect(editInput).toHaveValue('Original Task');

    await user.clear(editInput);
    await user.type(editInput, 'Updated Task{enter}');

    expect(screen.getByText('Updated Task')).toBeInTheDocument();
    expect(screen.queryByText('Original Task')).not.toBeInTheDocument();
  });

  it('cancels inline edit on Escape key', async () => {
    const user = userEvent.setup();
    render(<TodoApp />);

    const input = screen.getByRole('textbox', { name: /create a new todo item/i });
    await user.type(input, 'Task to cancel{enter}');

    const editBtn = screen.getByRole('button', { name: /edit task "task to cancel"/i });
    await user.click(editBtn);

    const editInput = screen.getByRole('textbox', { name: /edit todo item/i });
    await user.type(editInput, 'Changed text{Escape}');

    expect(screen.getByText('Task to cancel')).toBeInTheDocument();
    expect(screen.queryByText('Changed text')).not.toBeInTheDocument();
  });

  it('deletes a todo item', async () => {
    const user = userEvent.setup();
    render(<TodoApp />);

    const input = screen.getByRole('textbox', { name: /create a new todo item/i });
    await user.type(input, 'Task to delete{enter}');

    const deleteBtn = screen.getByRole('button', { name: /delete task "task to delete"/i });
    await user.click(deleteBtn);

    expect(screen.queryByText('Task to delete')).not.toBeInTheDocument();
    expect(screen.getByText('No tasks found')).toBeInTheDocument();
  });

  it('filters tasks by All, Active, and Completed', async () => {
    const user = userEvent.setup();
    render(<TodoApp />);

    const input = screen.getByRole('textbox', { name: /create a new todo item/i });
    await user.type(input, 'Active task{enter}');
    await user.type(input, 'Completed task{enter}');

    const checkbox = screen.getByRole('checkbox', { name: /mark "completed task" as completed/i });
    await user.click(checkbox);

    // Active filter
    const activeFilterBtn = screen.getByRole('button', { name: /^active$/i });
    await user.click(activeFilterBtn);

    expect(screen.getByText('Active task')).toBeInTheDocument();
    expect(screen.queryByText('Completed task')).not.toBeInTheDocument();

    // Completed filter
    const completedFilterBtn = screen.getByRole('button', { name: /^completed$/i });
    await user.click(completedFilterBtn);

    expect(screen.getByText('Completed task')).toBeInTheDocument();
    expect(screen.queryByText('Active task')).not.toBeInTheDocument();
  });

  it('clears completed tasks', async () => {
    const user = userEvent.setup();
    render(<TodoApp />);

    const input = screen.getByRole('textbox', { name: /create a new todo item/i });
    await user.type(input, 'Done task{enter}');

    const checkbox = screen.getByRole('checkbox', { name: /mark "done task" as completed/i });
    await user.click(checkbox);

    const clearBtn = screen.getByRole('button', { name: /clear completed/i });
    await user.click(clearBtn);

    expect(screen.queryByText('Done task')).not.toBeInTheDocument();
    expect(screen.getByText('No tasks found')).toBeInTheDocument();
  });
});
