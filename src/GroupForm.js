import { useState } from "react/cjs/react.development";
import EmojiPicker from "emoji-picker-react";

function GroupForm({ onAddGroup, onCancelGroup }) {
  const [name, setName] = useState("");
  const [groupEmoji, setGroupEmoji] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:9292/groups", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: name,
        emoji: groupEmoji,
      }),
    })
      .then((r) => r.json())
      .then((newGroup) => {
        onAddGroup(newGroup);
        setName("");
        setGroupEmoji("");
        onCancelGroup();
      });
  }

  function onEmojiClick(event, emojiObject) {
    setGroupEmoji(emojiObject.emoji);
  }
  function handleCancel(e) {
    e.preventDefault();
    onCancelGroup();
  }

  return (
    <form className="form-inputs" onSubmit={handleSubmit}>
      <div className="group-form-name-emoji">
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          value={name}
          placeholder="Enter New Group Name"
        ></input>
        {groupEmoji}
      </div>
      <EmojiPicker onEmojiClick={onEmojiClick} />
      <div className="group-form-buttons">
        <button type="submit">Submit</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </form>
  );
}

export default GroupForm;
