import { useState, useEffect } from "react";
import ToDo from "../components/todos";
import { Card } from "react-bootstrap";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    // Filter tasks based on the search term
    const filtered = tasks.filter((task) =>
      task.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTasks(filtered);
  }, [searchTerm, tasks]);

  const handleRemoveTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search tasks"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task, index) => (
            <tr key={index}>
              <td>{task}</td>
              <td>
                <button onClick={() => handleRemoveTask(index)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");

  const addTodo = () => {
    if (text.trim() !== "") {
      const newTodo = {
        id: Date.now(),
        text,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setText("");
    }
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const editTodo = (id, newText) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: newText } : todo
    );
    setTodos(updatedTodos);
  };

  const toggleTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") {
      return true;
    } else if (filter === "completed") {
      return todo.completed;
    } else {
      return !todo.completed;
    }
  });

  return (
    <div className="App">
      <TodoList />

      <h1>To-Do List</h1>
      <div>
        <input
          type="text"
          placeholder="Add a new todo"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <div>
        <label>
          Show:
          <select onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Done">Done</option>
            <option value="Todo">Todo</option>
          </select>
        </label>
      </div>
      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>Task</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <Card>
            <Card.Body>
              {filteredTodos.map((todo) => (
                <ToDo
                  key={todo.id}
                  todo={todo}
                  onDelete={deleteTodo}
                  onEdit={editTodo}
                  onToggle={toggleTodo}
                />
              ))}
            </Card.Body>
          </Card>
        </tbody>
      </table>
    </div>
  );
}

export default App;
