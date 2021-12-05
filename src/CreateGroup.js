import { useState } from "react/cjs/react.development";
import GroupForm from "./GroupForm";

function CreateGroup({ onAddGroup }) {
  const [isCreateGroup, setIsCreateGroup] = useState(false);

  function handleCreateGroup() {
    setIsCreateGroup(!isCreateGroup);
    setIsCreateGroup(!isCreateGroup);
  }

  return (
    <div className="create-group">
      <button onClick={handleCreateGroup}>CreateGroup</button>
      <div className="form-group">
        {isCreateGroup ? (
          <div>
            <GroupForm onAddGroup={onAddGroup} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
export default CreateGroup;
