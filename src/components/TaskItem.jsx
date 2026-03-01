function TaskItem({ task, index, deleteTask, toggleTask }) {
  return (
    <li
      style={{
        margin: "10px auto",
        padding: "10px",
        width: "300px",
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: task.completed ? "#c8f7c5" : "#f2f2f2",
        textDecoration: task.completed ? "line-through" : "none",
        cursor: "pointer"
      }}
    >
      <span onClick={() => toggleTask(index)}>
        {task.text}
      </span>

      <button
        onClick={() => deleteTask(index)}
        style={{ background: "red", color: "white", border: "none" }}
      >
        X
      </button>
    </li>
  );
}

export default TaskItem;