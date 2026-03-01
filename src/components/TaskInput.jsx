import { useState } from "react";

function TaskInput({ addTask }) {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim() === "") return;
    addTask(input);
    setInput("");
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Enter task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ padding: "8px", width: "250px" }}
      />
      <button
        onClick={handleAdd}
        style={{ padding: "8px", marginLeft: "5px" }}
      >
        Add
      </button>
    </div>
  );
}

export default TaskInput;