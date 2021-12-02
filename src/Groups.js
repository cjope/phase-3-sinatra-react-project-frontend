// import { useEffect, useState } from "react/cjs/react.development";
import { Button } from "react-bootstrap";
// import { useState, useEffect } from "react/cjs/react.development";
import CreateGroup from "./CreateGroup";

function Groups({ groups, setID, onAddGroup }) {
  function handleID(e) {
    setID(e.target.value);
  }

  // const [groups, setGroups] = useState([]);

  // useEffect(() => {
  //   fetch(`http://localhost:9292/groups`)
  //     .then((r) => r.json())
  //     .then((data) => {
  //       setGroups(data);
  //     });
  // }, []);

  const groupButtons = groups.map((group) => (
    <Button
      key={group.id}
      value={group.id}
      onClick={(e) => {
        handleID(e);
      }}
    >
      {group.name} {group.bicon}
    </Button>
  ));

  return (
    <div className="groups">
      {groupButtons}
      <CreateGroup onAddGroup={onAddGroup} />
    </div>
  );
}
export default Groups;
