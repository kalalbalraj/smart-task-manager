import { useState } from "react";

function TaskInput({ addTask }) {
  const [input, setInput] = useState("");
  const [date, setDate] = useState("");

  const handleAdd = () => {
    if (input.trim() === "") return;

    addTask(input, date);   // ✅ only once
    setInput("");
    setDate("");
  };

  return (
    <div className="task-input-container">
  
  <div className="input-group">
    <input
      type="text"
      placeholder="Enter task..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />

    <input
      type="date"
      value={date}
      onChange={(e) => setDate(e.target.value)}
    />
  </div>

  <button onClick={handleAdd}>Add</button>

</div>
  );
}

export default TaskInput;