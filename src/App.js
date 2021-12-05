import { useEffect, useState } from "react";
import "./App.css";
import Groups from "./Groups";
import Header from "./Header";
import TaskList from "./TaskList";

function App() {
  const [groups, setGroups] = useState([]);
  const [ID, setID] = useState(1);
  const [search, setSearch] = useState("");
  const [activeGroup, setActiveGroup] = useState([]);
  const [activeTasks, setActiveTasks] = useState([]);

  // setActiveGroup([]);

  useEffect(() => {
    fetch(`http://localhost:9292/groups`)
      .then((r) => r.json())
      .then((data) => {
        setGroups(data);
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

  function handleNewGroup(newGroup) {
    setGroups([...groups, newGroup]);
  }

  function handleNewTask(newTask) {
    setActiveTasks([...activeTasks, newTask]);
  }

  function handleDeleteTask(id) {
    const updatedTasks = activeGroup.tasks.filter((task) => task.id !== id);
    setActiveTasks(updatedTasks);
    setID(activeTasks[0].group_id);
  }

  return (
    <div className="App">
      <Header activeGroup={activeGroup} />
      <form>
        <input
          className="search"
          type="text"
          value={search}
          placeholder="Search Tasks"
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
          activeGroup={activeGroup}
          tasks={activeTasks}
          onAddTask={handleNewTask}
          ID={ID}
          onTaskDelete={handleDeleteTask}
        />
      </div>
    </div>
  );
}

export default App;
