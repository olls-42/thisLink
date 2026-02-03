import React from 'react';

interface TodoItemProps {
  todo: {
    id: number;
    text: string;
    completed: boolean;
  };
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoItemComponent: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <li style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
      {todo.text}
      <button onClick={() => onToggle(todo.id)}>
        {todo.completed ? 'Undo' : 'Complete'}
      </button>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
};

export default TodoItemComponent;
