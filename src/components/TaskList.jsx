import React, { useState } from "react";

function TaskList({ tasks, deleteTask, toggleTask, updateTask }) {

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  if (tasks.length === 0) {
    return <p>No tasks found</p>;
  }

  const handleEdit = (task) => {
    setEditId(task.id);
    setEditText(task.text);
  };

  const handleSave = (id) => {
    updateTask(id, editText);
    setEditId(null);
    setEditText("");
  };

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className="task-item">

          <div className="task-left">

            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />

            {editId === task.id ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="edit-input"
              />
            ) : (
              <div className="task-text">
                <span className={task.completed ? "completed" : ""}>
                  {task.text}
                </span>

                {task.date && (
                  <div className="task-date">
                    📅 {task.date}
                  </div>
                )}
              </div>
            )}

          </div>

          <div className="task-actions">

            {editId === task.id ? (
              <button onClick={() => handleSave(task.id)}>Save</button>
            ) : (
              <button onClick={() => handleEdit(task)}>Edit</button>
            )}

            <button
              className="delete-btn"
              onClick={() => deleteTask(task.id)}
            >
              ✕
            </button>

          </div>

        </li>
      ))}
    </ul>
  );
}

export default TaskList;