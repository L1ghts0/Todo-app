import React from "react";
import { useState } from "react";
import "./style.css";

const ItemComponent = ({
  item,
  handleEditItem,
  handleDeleteItem,
  handleToggleCompleted,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newItem, setNewItem] = useState(item.name);
  const [errors, setErrors] = useState("");

  const onEdit = () => {
    if (newItem) {
      handleEditItem(item.id, newItem);
      setIsEditing(false);
      setErrors("");
    } else {
      setErrors("List must not be empty");
    }
  };

  return (
    <>
      <li>
        {isEditing ? (
          <input
            type="text"
            value={newItem}
            onChange={(event) => setNewItem(event.target.value)}
          />
        ) : (
          <>
            <span>{item.name}</span>
            <input
              type="checkbox"
              onChange={() => handleToggleCompleted(item.id)}
              className="checkbox"
            />
          </>
        )}
        <div>
          <button
            onClick={() => {
              isEditing ? onEdit() : setIsEditing(true);
            }}
            className="btn-edit">
            {isEditing ? "Save" : "edit"}
          </button>
          <button
            onClick={() => handleDeleteItem(item.id)}
            className="btn-delete">
            Delete
          </button>
        </div>
      </li>
      {errors ? <p className="errors">{errors}</p> : null}
    </>
  );
};

export default ItemComponent;
