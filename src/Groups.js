import { Button } from "react-bootstrap";
import CreateGroup from "./CreateGroup";

function Groups({ groups, setActiveGroup, onAddGroup }) {
  const groupButtons = groups.map((group) => (
    <Button onClick={(e) => setActiveGroup(group)} key={group.id}>
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
