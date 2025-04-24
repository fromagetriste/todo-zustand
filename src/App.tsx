import { useState } from "react";
import { useTodoStore } from "./store/todoStore";
import "./App.css";

function App() {
  const [text, setText] = useState("");

  const todos = useTodoStore((state) => state.todos);
  const addTodo = useTodoStore((state) => state.addTodo);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const clearTodos = useTodoStore((state) => state.clearTodos);

  const handleAdd = () => {
    if (text.trim() === "") return;
    addTodo(text);
    setText("");
  };

  return (
    <div className="app">
      <h1>📝 Todo App</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Add a new task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? "completed" : ""}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)}>❌</button>
          </li>
        ))}
      </ul>

      {todos.length > 0 && (
        <button className="clear-button" onClick={clearTodos}>
          Clear All
        </button>
      )}
    </div>
  );
}

export default App;
