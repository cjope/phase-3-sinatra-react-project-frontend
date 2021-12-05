import { Button } from "react-bootstrap";
import CreateGroup from "./CreateGroup";

function Groups({ groups, setID, onAddGroup }) {
  const groupButtons = groups.map((group) => (
    <Button
      key={group.id}
      value={group.id}
      onClick={(e) => {
        setID(e.target.value);
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
