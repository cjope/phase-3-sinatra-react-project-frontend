import CreateTask from "./CreateTask";

function TaskList({ search, tasks, ID, onAddTask }) {
  const displayTask = Object.values(tasks).filter((task) =>
    task.body.toLowerCase().includes(search.toLowerCase())
  );
  const listTasks = displayTask.map((task) => (
    <div className="list-tasks" key={task.id}>
      <small>
        {new Date(task.due).toLocaleDateString("en", {
          weekday: "long",
        })}
        {", "}
        {new Date(task.due).toLocaleDateString("en", {
          month: "short",
          year: "numeric",
        })}
      </small>
      <div className="task-body">
        <p>{task.body}</p>
        <span>
          <button
            value={task.id}
            onClick={(e) => console.log(`edit task id: ${e.target.value}`)}
          >
            🗑️
          </button>
          <button
            value={task.body}
            onClick={(e) => console.log(`edit task body: ${e.target.value}`)}
          >
            ✏️
          </button>
        </span>
      </div>
    </div>
  ));

  return (
    <div className="task-list">
      <CreateTask ID={ID} onAddTask={onAddTask} />
      <div className="tasks">{listTasks}</div>
    </div>
  );
}
export default TaskList;
