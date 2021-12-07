import { useState } from "react/cjs/react.development";

function TaskForm({ onAddTask, ID, isCreateTask, setIsCreateTask }) {
  const [body, setBody] = useState("");
  const [due, setDue] = useState(new Date());

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:9292/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        body: body,
        due: new Date(due).toJSON(),
        group_id: ID,
      }),
    })
      .then((r) => r.json())
      .then((newTask) => {
        onAddTask(newTask);
        setBody("");
        setDue("");
        setIsCreateTask(!isCreateTask);
      });
  }

  function handleCancel(e) {
    e.preventDefault();
    setIsCreateTask(!isCreateTask);
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        className="task-text"
        onChange={(e) => setBody(e.target.value)}
        type="text"
        value={body}
        placeholder="Enter New Task"
      />
      <div className="date-submit">
        <input
          onChange={(e) => setDue(e.target.value)}
          type="date"
          value={due}
        />
        <button type="submit">Save</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </form>
  );
}
export default TaskForm;
