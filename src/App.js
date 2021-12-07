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
  const [currentUserID, setCurrentUserID] = useState(1);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:9292/users`)
      .then((r) => r.json())
      .then((data) => setUsers(data));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:9292/users/${currentUserID}`)
      .then((r) => r.json())
      .then((data) => {
        setActiveGroup(data.groups);
        setGroups(data.groups);
        const firstGroup = data.groups[0].id;
        setID(firstGroup);
      });
  }, [currentUserID]);

  useEffect(() => {
    fetch(`http://localhost:9292/groups/${ID}`)
      .then((r) => r.json())
      .then((data) => {
        setActiveTasks(data.tasks);
      });
  }, [ID]);

  function handleNewGroup(newGroup) {
    setGroups([...groups, newGroup]);
    setActiveGroup(newGroup);
  }

  function handleNewTask(newTask) {
    setActiveTasks([...activeTasks, newTask]);
  }

  function handleDeleteTask(id) {
    const updatedTasks = activeGroup.tasks.filter((task) => task.id !== id);
    setActiveTasks(updatedTasks);
    setID(activeTasks[0].group_id);
  }

  const userName = users.map((user) => (
    <option value={user.id} key={user.id}>
      {user.name}
    </option>
  ));

  function handleSetUser(e) {
    setCurrentUserID(e.target.value);
  }

  return (
    <div className="App">
      <Header activeGroup={activeGroup} />
      <select onChange={handleSetUser}>{userName}</select>
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
          setID={setID}
          ID={ID}
          onTaskDelete={handleDeleteTask}
          setActiveTasks={setActiveTasks}
        />
      </div>
    </div>
  );
}

export default App;
