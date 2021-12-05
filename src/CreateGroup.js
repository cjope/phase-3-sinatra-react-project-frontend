import { useState } from "react/cjs/react.development";
import GroupForm from "./GroupForm";

function CreateGroup({ onAddGroup }) {
  const [isCreateGroup, setIsCreateGroup] = useState(false);

  function handleCreateGroup() {
    setIsCreateGroup(!isCreateGroup);
  }

  return (
    <div className="create-group">
      {!isCreateGroup ? (
        <button onClick={handleCreateGroup}>CreateGroup</button>
      ) : (
        <div className="form-group">
          <div>
            <h2>Create Group:</h2>
            <GroupForm
              onCancelGroup={handleCreateGroup}
              onAddGroup={onAddGroup}
            />
          </div>
        </div>
      )}
    </div>
  );
}
export default CreateGroup;
