import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoList from '../Todos/List';

// Mocked todos data for testing
const mockTodos = [
  { id: 1, text: 'Task 1', done: false },
];

// Mocked deleteTodo and completeTodo functions
const mockDeleteTodo = jest.fn();
const mockCompleteTodo = jest.fn();

describe('TodoList Component', () => {
  it('renders a list of todos with delete and complete buttons', () => {
    const { container, getByText } = render(
      <TodoList
        todos={mockTodos}
        deleteTodo={mockDeleteTodo}
        completeTodo={mockCompleteTodo}
      />
    );

    // Check if each todo is rendered
    mockTodos.forEach((todo) => {
      const todoText = getByText(todo.text);
      expect(todoText).toBeInTheDocument();

      const deleteButton = getByText('Delete');
      expect(deleteButton).toBeInTheDocument();
      fireEvent.click(deleteButton);
      expect(mockDeleteTodo).toHaveBeenCalledWith(todo);

      if (!todo.done) {
        const completeButton = getByText('Set as done');
        expect(completeButton).toBeInTheDocument();
        fireEvent.click(completeButton);
        expect(mockCompleteTodo).toHaveBeenCalledWith(todo);
      }
    });

    // Check if horizontal lines are rendered
    const horizontalLines = container.querySelectorAll('hr');
    expect(horizontalLines.length).toBe(mockTodos.length);
  });
});
