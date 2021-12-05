import { useState } from "react";
import TaskForm from "./TaskForm";
function CreateTask({ onAddTask, ID }) {
  const [isCreateTask, setIsCreateTask] = useState(false);

  function handleCreateTask() {
    setIsCreateTask(!isCreateTask);
  }

  return (
    <div>
      {!isCreateTask ? (
        <div className="task-button">
          <button onClick={handleCreateTask}>CreateTask</button>
        </div>
      ) : (
        <div className="create-task-div">
          <span>
            <h2>Create Task:</h2>

            <div className="form-task">
              <TaskForm
                onAddTask={onAddTask}
                ID={ID}
                isCreateTask={setIsCreateTask}
                setIsCreateTask={setIsCreateTask}
              />
            </div>
          </span>
        </div>
      )}
    </div>
  );
}
export default CreateTask;
