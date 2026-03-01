import React, { useState } from "react";

function TaskList({ tasks, deleteTask, toggleTask, updateTask }) {
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  if (tasks.length === 0) {
    return <p>No tasks found</p>;
  }

  const handleEdit = (index, text) => {
    setEditIndex(index);
    setEditText(text);
  };

  const handleSave = (index) => {
    updateTask(index, editText);
    setEditIndex(null);
    setEditText("");
  };

  return (
    <ul className="task-list">
      {tasks.map((task, index) => (
        <li key={index} className="task-item">
          <div className="task-left">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(index)}
            />

            {editIndex === index ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="edit-input"
              />
            ) : (
              <span className={task.completed ? "completed" : ""}>
                {task.text}
              </span>
            )}
          </div>

          <div className="task-actions">
            {editIndex === index ? (
              <button onClick={() => handleSave(index)}>Save</button>
            ) : (
              <button onClick={() => handleEdit(index, task.text)}>
                Edit
              </button>
            )}

            <button className="delete-btn" onClick={() => deleteTask(index)}>
              ✕
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;