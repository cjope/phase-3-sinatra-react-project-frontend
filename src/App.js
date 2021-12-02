import { useEffect, useState } from "react";
import "./App.css";
import Groups from "./Groups";
import Header from "./Header";
import TaskList from "./TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [groups, setGroups] = useState([]);
  const [ID, setID] = useState(1);
  const [search, setSearch] = useState("");
  const [activeGroup, setActiveGroup] = useState("");
  const [activeTasks, setActiveTasks] = useState("");

  useEffect(() => {
    fetch(`http://localhost:9292/groups`)
      .then((r) => r.json())
      .then((data) => {
        setGroups(data);
        setTasks(data.tasks);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:9292/groups/${ID}`)
      .then((r) => r.json())
      .then((data) => {
        setActiveGroup(data);
        setActiveTasks(data.tasks);
      });
  }, [ID]);

  useEffect(() => {
    fetch(`http://localhost:9292/tasks`)
      .then((r) => r.json())
      .then((data) => {
        setTasks(data);
      });
  }, []);

  console.log(activeTasks);

  function handleNewGroup(newGroup) {
    setGroups([...groups, newGroup]);
  }

  function handleNewTask(newTask) {
    setTasks([...tasks, newTask]);
  }

  return (
    <div className="App">
      <Header activeGroup={activeGroup} />
      <form>
        <input
          className="search"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
      </form>
      <div className="body">
        <Groups
          search={search}
          setID={setID}
          groups={groups}
          setGroups={setGroups}
          onAddGroup={handleNewGroup}
        />
        <TaskList
          search={search}
          setSearch={setSearch}
          setTasks={setTasks}
          activeGroup={activeGroup}
          tasks={activeTasks}
          onAddTask={handleNewTask}
          ID={ID}
        />
      </div>
    </div>
  );

  // return (
  //   <body>
  //     <div class="header-row">
  //       <h1 class="header-left">TaskApp</h1>
  //       <h1 class="header-right">GROUP</h1>
  //     </div>

  //     <div class="create-row">
  //       <div class="create-group">
  //         <button>Create Group</button>
  //         <form>
  //           <input />
  //           <select></select>
  //         </form>
  //       </div>
  //       <div class="create-task">
  //         <button>Create Task</button>
  //         <form>
  //           <input class="text" type="text" placeholder="New Task" />

  //           <input class="date" type="date" />
  //           <button>Save</button>
  //           <button>Cancel</button>
  //         </form>
  //       </div>
  //     </div>

  //     <div class="body-row">
  //       <div class="group-column">
  //         <div class="group-column">
  //           <h1>Group</h1>
  //         </div>
  //         <div class="group-column">
  //           <h1>Group</h1>
  //         </div>
  //         <div class="group-column">
  //           <h1>Group</h1>
  //         </div>
  //         <div class="group-column">
  //           <h1>Group</h1>
  //         </div>
  //       </div>

  //       <div class="task-column">
  //         <div class="task-column">
  //           <p>Task</p>
  //         </div>
  //         <div class="task-column">
  //           <p>Task</p>
  //         </div>
  //         <div class="task-column">
  //           <p>Task</p>
  //         </div>
  //         <div class="task-column">
  //           <p>Task</p>
  //         </div>
  //         <div class="task-column">
  //           <p>Task</p>
  //         </div>
  //         <div class="task-column">
  //           <p>Task</p>
  //         </div>
  //       </div>
  //     </div>
  //   </body>
  // );
}

export default App;
