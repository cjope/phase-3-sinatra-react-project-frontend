import { useState } from "react";
import CreateTask from "./CreateTask";

function TaskList({
  group,
  user,
  tasks,
  search,
  onAddTask,
  setID,
  onTaskDelete,
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [modTask, setModTask] = useState("");
  const [editTaskID, setEditTaskID] = useState("");

  function handleDeleteClick(e) {
    e.preventDefault();
    const id = e.target.value;
    fetch(`http://localhost:9292/tasks/${id}`, {
      method: "DELETE",
    });
    onTaskDelete(id);
  }

  function handleEditMode(e) {
    e.preventDefault();
    setIsEdit(!isEdit);
    setEditTaskID(e.target.value);
  }

  function handleEditTask(e) {
    e.preventDefault();
    fetch(`http://localhost:9292/tasks/${editTaskID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        body: modTask,
      }),
    })
      .then((r) => r.json())
      .then((updatedTask) => {
        setID(updatedTask.user_id);
        setIsEdit(!isEdit);
      });
  }

  const displayTask = Object.values(tasks).filter((task) =>
    task.body.toLowerCase().includes(search.toLowerCase())
  );

  const userTasks = displayTask
    .filter((task) => task.user_id === user && task.group_id === group.id)
    .map((task) => {
      const dueDate = new Date(task.due).toLocaleDateString("en", {
        timeZone: "GMT",
      });

      const dateDiff = Math.round(
        (new Date(dueDate).getTime() - new Date().getTime()) /
          (1000 * 3600 * 24)
      );

      const weekDay = new Date(task.due).toLocaleDateString("en", {
        weekday: "long",
        timeZone: "GMT",
      });

      const shortDate = new Date(task.due).toLocaleDateString("en", {
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "GMT",
      });

      return (
        <div className="list-tasks" key={task.id}>
          {dateDiff < 0 ? `Overdue!` : `Due in ${dateDiff} days`}
          <small>
            {weekDay} {shortDate}
          </small>
          <div className="task-body">
            {isEdit ? (
              <form onSubmit={handleEditTask}>
                <input
                  placeholder={task.body}
                  onChange={(e) => setModTask(e.target.value)}
                ></input>
                <button type="submit">Save</button>
              </form>
            ) : (
              <p>{task.body}</p>
            )}

            <span>
              <button value={task.id} onClick={handleDeleteClick}>
                🗑️
              </button>
              <button value={task.id} onClick={handleEditMode}>
                ✏️
              </button>
            </span>
          </div>
        </div>
      );
    });

  return (
    <div className="task-list">
      <CreateTask
        user={user}
        onAddTask={onAddTask}
        setID={setID}
        group={group}
      />
      <div className="tasks">{userTasks}</div>
    </div>
  );
}
export default TaskList;
