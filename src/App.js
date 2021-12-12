import Button from "@restart/ui/esm/Button";
import { useEffect, useState } from "react/cjs/react.development";
import Groups from "./Groups";
import Header from "./Header";
import TaskList from "./TaskList";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeUser, setActiveUser] = useState(1);
  const [activeGroup, setActiveGroup] = useState(1);
  const [search, setSearch] = useState("");
  const [header, setHeader] = useState([]);

  useState(() => {
    fetch(`http://localhost:9292/users`)
      .then((r) => r.json())
      .then((data) => setUsers(data));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:9292/users/${activeUser}/${activeGroup}`)
      .then((r) => r.json())
      .then((data) => setTasks(data));
  }, [activeGroup, activeUser]);

  useState(() => {
    fetch(`http://localhost:9292/groups`)
      .then((r) => r.json())
      .then((data) => setGroups(data));
  }, []);

  function handleUserSelect(user) {
    setActiveUser(user);
  }

  const selectUser = users.map((user) => (
    <Button
      onClick={(e) => handleUserSelect(user.id)}
      value={user.id}
      key={user.id}
    >
      {user.name}
    </Button>
  ));

  function handleDeleteTask(id) {
    // eslint-disable-next-line
    const updatedTasks = tasks.filter((task) => task.id != id); //only works with double equality comparrison
    setTasks(updatedTasks);
  }

  function handleNewGroup(newGroup) {
    setGroups([...groups, newGroup]);
    setActiveGroup(newGroup);
  }

  function handleNewTask(newTask) {
    setTasks([...tasks, newTask]);
  }

  function handleUpdateTask(updatedtasks) {
    setActiveUser([updatedtasks.user_id]);
  }

  return (
    <div className="App">
      <Header group={activeGroup} header={header} />
      <div className="users">{selectUser}</div>
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
          groups={groups}
          setActiveGroup={setActiveGroup}
          onAddGroup={handleNewGroup}
          setHeader={setHeader}
        />

        <TaskList
          tasks={tasks}
          user={activeUser}
          group={activeGroup}
          search={search}
          onAddTask={handleNewTask}
          setID={setActiveUser}
          onTaskDelete={handleDeleteTask}
          onUpdateTask={handleUpdateTask}
        />
      </div>
    </div>
  );
}
export default App;
