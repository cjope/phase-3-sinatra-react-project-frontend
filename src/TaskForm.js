import { useState } from "react/cjs/react.development";

function TaskForm({ onAddTask, ID }) {
  const [body, setBody] = useState("");
  const [due, setDue] = useState("");

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
        console.log(newTask);
      });
  }

  // console.log(`body: ${body}`);
  // console.log(`date: ${due}`);
  // console.log(`newDate: ${new Date(due).toJSON()}`);
  // console.log(`group_id: ${ID}`);

  return (
    <form onSubmit={handleSubmit}>
      {/* <span> */}
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
        {/* </span> */}
        <button type="submit">Save</button>
      </div>
    </form>
  );
}
export default TaskForm;
