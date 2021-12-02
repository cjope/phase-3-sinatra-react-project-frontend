import { useState } from "react";
import TaskForm from "./TaskForm";
function CreateTask({ onAddTask, ID }) {
  const [isCreateTask, setIsCreateTask] = useState(false);

  function handleCreateTask() {
    setIsCreateTask(!isCreateTask);
  }

  return (
    <div>
      <div className="task-button">
        <button onClick={handleCreateTask}>CreateTask</button>
      </div>
      <div className="create-task-div">
        {isCreateTask ? (
          <div className="form-task">
            <TaskForm onAddTask={onAddTask} ID={ID} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
export default CreateTask;
