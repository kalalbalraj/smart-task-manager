import { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
const [darkMode, setDarkMode] = useState(false);
  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    setTasks([...tasks, { text, completed: false }]);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const toggleTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const updateTask = (index, newText) => {
  const updatedTasks = tasks.map((task, i) =>
    i === index ? { ...task, text: newText } : task
  );
  setTasks(updatedTasks);
};

  // ✅ Task statistics (CORRECT PLACE)
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  // ✅ Filtering logic
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
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

        {/* ✅ Stats Section */}
        <div className="task-stats">
          <span>Total: {totalTasks}</span>
          <span>Completed: {completedTasks}</span>
          <span>Pending: {pendingTasks}</span>
        </div>

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