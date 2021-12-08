// import { useEffect, useState } from "react";
import { useEffect, useState } from "react/cjs/react.development";
import "./App.css";
// import Groups from "./Groups";
// import Header from "./Header";
// import TaskList from "./TaskList";

function App2() {
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [activeUserID, setActiveUserID] = useState(1);
  const [activeUser, setActiveUser] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:9292/users`)
      .then((r) => r.json())
      .then((data) => setUsers(data));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:9292/users/${activeUserID}`)
      .then((r) => r.json())
      .then((data) => setActiveUser(data));
  }, [activeUserID]);

  useEffect(() => {
    fetch("http://localhost:9292/groups")
      .then((r) => r.json())
      .then((data) => setGroups(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:9292/tasks")
      .then((r) => r.json())
      .then((data) => setTasks(data));
  }, []);

  const listGroups = groups.map((group) => (
    <ul key={group.id}>
      <li key={group.name}>{group.name}</li>
    </ul>
  ));

  const userTasks = tasks.filter((task) => task.user_id === activeUserID);

  const userName = users
    .filter((user) => user.id === activeUserID)
    .map((user) => user.name);

  const listUserTasks = userTasks.map((task) => (
    <ul key={task.id}>
      <li key={task.body}>
        user_id: {task.user_id}, group_id: {task.group_id}, body: {task.body}
      </li>
    </ul>
  ));

  const userList = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  function setOne(e) {
    setActiveUserID(1);
    console.log(e.target.value);
  }

  function setTwo() {
    setActiveUserID(2);
  }

  function selectUser(e) {
    setActiveUserID(e.target.value);
  }

  // console.log(activeUserID);

  return (
    <div>
      <h1>TESTING</h1>
      <div>
        <button onClick={setOne} value={1}>
          Jeff
        </button>
        <button onClick={setTwo}>Laura</button>
        <h2>Current User</h2>
        <p>{userName}</p>
      </div>
      <div>
        <h1>User's Tasks</h1>
        {listUserTasks}
      </div>
    </div>
  );
}

export default App2;
