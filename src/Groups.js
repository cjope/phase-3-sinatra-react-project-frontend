import { Button } from "react-bootstrap";
import { useState } from "react/cjs/react.development";
import CreateGroup from "./CreateGroup";

function Groups({ groups, onAddGroup }) {
  const [activeGroupID, setActiveGroupID] = useState(2);

  const groupButtons = groups.map((group) => (
    <Button
      key={group.id}
      value={group.id}
      onClick={(e) => {
        setActiveGroupID(e.target.value);
      }}
    >
      {group.name} {group.emoji}
    </Button>
  ));

  const group1 = groups
    .filter((group) => group.id === activeGroupID)
    .map((group) => group.name)
    .toString(); //has this always been this difficult?!?!?

  console.log(group1);
  // console.log(activeGroupName);

  return (
    <div className="groups">
      {groupButtons}
      <CreateGroup onAddGroup={onAddGroup} />
      {/* {activeGroupName} */}
    </div>
  );
}
export default Groups;
