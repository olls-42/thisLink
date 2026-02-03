import { useState } from 'react'
import './App.css'
import TodoItemComponent from './TodoItemComponent';

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

/**
 * Огляд від ШІ
 * 
 * Building a To-Do list with React and Vite involves using modern web development
 * practices like component-based architecture and state management, 
 * leveraging Vite for a fast developer experience. 
 * 
 * Here is a high-level guide to building a basic React Todo list using Vite,
 * functional components, and hooks (useState
 */
function App() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [input, setInput] = useState('');

  const addTodo = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const newTodo: TodoItem = {
      id: Date.now(),
      text: input,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInput('');
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="App">
      <h1>My Todo List</h1>
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task"
        />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <TodoItemComponent
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
      </ul>
    </div>
  );
}

export default App
