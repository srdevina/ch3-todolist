/* eslint-disable react/prop-types */
import { useState } from "react";

const ToDo = ({ todo, onDelete, onEdit, onToggle }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.text);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onEdit(todo.id, text);
    setIsEditing(false);
  };

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
      </td>
      <td>
        {isEditing ? (
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        ) : (
          <span className={todo.completed ? "completed" : ""}>{todo.text}</span>
        )}
      </td>
      <td>
        {isEditing ? (
          <button onClick={handleSaveClick}>Save</button>
        ) : (
          <button onClick={handleEditClick}>Edit</button>
        )}
        <button onClick={() => onDelete(todo.id)}>Delete</button>
      </td>
    </tr>
  );
};

export default ToDo;
