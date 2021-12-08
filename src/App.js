import Button from "@restart/ui/esm/Button";
import { useState } from "react/cjs/react.development";
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

  useState(() => {
    fetch(`http://localhost:9292/users`)
      .then((r) => r.json())
      .then((data) => setUsers(data));
  }, []);

  useState(() => {
    fetch(`http://localhost:9292/groups`)
      .then((r) => r.json())
      .then((data) => setGroups(data));
  }, []);

  useState(() => {
    fetch(`http://localhost:9292/tasks`)
      .then((r) => r.json())
      .then((data) => setTasks(data));
  }, []);

  const listUsers = users.map((user) => (
    <Button
      onClick={(e) => setActiveUser(user.id)}
      value={user.id}
      key={user.id}
    >
      {user.name}
    </Button>
  ));

  function handleDeleteTask(id) {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    console.log(tasks[0].user_id);
    setActiveUser(tasks[0].user_id);
    //no update on refresh
  }

  console.log(activeUser);

  function handleNewGroup(newGroup) {
    setGroups([...groups, newGroup]);
    setActiveGroup(newGroup);
  }

  function handleNewTask(newTask) {
    setTasks([...tasks, newTask]);
  }

  function handleUpdateTask(updatedtasks) {
    setTasks(updatedtasks);
    //no update on refresh - sets
  }

  return (
    <div className="App">
      <Header group={activeGroup} />

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
      {listUsers}
    </div>
  );
}
export default App;
