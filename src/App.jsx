import { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import "./App.css";

function App() {

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState("");   // ✅ FIXED POSITION

  // Save tasks
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add task
  const addTask = (text, date) => {

    const newTask = {
      id: Date.now(),
      text,
      date,
      completed:false
    };

    setTasks([...tasks, newTask]);
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Clear completed
  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  // Toggle completed
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  // Update task
  const updateTask = (id, newText) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  const filteredTasks = tasks.filter((task) => {

    const matchesSearch = task.text
      .toLowerCase()
      .includes(search.toLowerCase());

    if (filter === "completed")
      return task.completed && matchesSearch;

    if (filter === "pending")
      return !task.completed && matchesSearch;

    return matchesSearch;
  });

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <div className="card">

        <div className="top-bar">
          <button
            className="dark-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        <h1>Smart Task Manager</h1>

        <TaskInput addTask={addTask} />

        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <div className="filters">
          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>

          <button
            className={filter === "completed" ? "active" : ""}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>

          <button
            className={filter === "pending" ? "active" : ""}
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>
        </div>

        <div className="task-stats">
          <span>Total: {totalTasks}</span>
          <span>Completed: {completedTasks}</span>
          <span>Pending: {pendingTasks}</span>
        </div>

        <button
          onClick={clearCompleted}
          className="clear-btn"
        >
          Clear Completed
        </button>

        <TaskList
          tasks={filteredTasks}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          updateTask={updateTask}
        />

      </div>
    </div>
  );
}

export default App;