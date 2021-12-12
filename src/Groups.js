import { Button } from "react-bootstrap";
import CreateGroup from "./CreateGroup";

function Groups({ groups, setHeader, setActiveGroup, onAddGroup }) {
  function handleGroupSelect(group) {
    setActiveGroup(group.id);
    setHeader(group);
  }

  const groupButtons = groups.map((group) => (
    <Button onClick={(e) => handleGroupSelect(group)} key={group.id}>
      {group.name}
      {group.emoji}
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
