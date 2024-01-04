import React, { useRef } from "react";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import ItemComponent from "./ItemComponent";
import "./style.css";

const todocomponent = () => {
  const inputRef = useRef();
  const [item, setItem] = useState("");
  const [list, setList] = useState([]);
  const [errors, setErrors] = useState("");
  const [completedList, setCompletedList] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all"); // "all", "active", or "completed"
  const [showCompletedSection, setShowCompletedSection] = useState(false);

  const handleButton = () => {
    if (item) {
      setList([...list, { id: uuid(), name: item }]);
      setItem("");
      setErrors("");
    } else {
      setErrors("Todo list cannot be empty");
      inputRef.current.focus();
    }
  };

  const handleEditItem = (id, newItem) => {
    const updatedList = list.map((item) => {
      if (item.id === id) {
        return { ...item, name: newItem };
      }
      return item;
    });
    setList(updatedList);
  };

  const handleDeleteItem = (removeId) => {
    const filteredItems = list.filter((item) => item.id !== removeId);
    setList(filteredItems);
  };

  const handleClearItems = () => {
    setList([]);
  };

  const handleToggleCompleted = (id) => {
    const completedItem = list.find((item) => item.id === id);
    if (completedItem) {
      setCompletedList([...completedList, completedItem]);
      handleDeleteItem(id);
    }
  };

  const handleRemoveCompleted = (removeId) => {
    const filteredCompletedItems = completedList.filter(
      (item) => item.id !== removeId
    );
    setCompletedList(filteredCompletedItems);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setShowCompletedSection(false);
  };

  const handleShowCompleted = () => {
    setActiveFilter("completed");
    setShowCompletedSection(true);
  };

  const filteredList = () => {
    if (showCompletedSection) {
      return completedList;
    } else if (activeFilter === "active") {
      return list.filter(
        (item) =>
          !completedList.some((completedItem) => completedItem.id === item.id)
      );
    } else {
      return list;
    }
  };

  return (
    <div className="Todo-app">
      <h1>Todo App</h1>

      <div className="input-section">
        <div className="input-container">
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter a task"
            value={item}
            onChange={(event) => setItem(event.target.value)}
          />
          <button onClick={handleButton} className="btn-add">
            Add Task
          </button>
        </div>
        <div>{errors ? <p className="errors">{errors}</p> : null}</div>
      </div>
      <div>
        <button
          onClick={() => handleFilterChange("active")}
          className={`filter-btn ${activeFilter === "active" ? "active" : ""}`}>
          Active
        </button>
        <button
          onClick={handleShowCompleted}
          className={`filter-btn ${showCompletedSection ? "active" : ""}`}>
          Completed
        </button>
      </div>
      {showCompletedSection ? (
        <ul className="completed-list">
          {completedList.map((completedItem) => (
            <li key={completedItem.id}>
              <span>{completedItem.name}</span>
              <button
                onClick={() => handleRemoveCompleted(completedItem.id)}
                className="btn-remove">
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="Todo-list">
          {filteredList().map((item) => (
            <ItemComponent
              key={item.id}
              item={item}
              handleEditItem={handleEditItem}
              handleDeleteItem={handleDeleteItem}
              handleToggleCompleted={handleToggleCompleted}
            />
          ))}

          {list.length > 0 ? (
            <button onClick={handleClearItems} className="btn-clear">
              Clear Items
            </button>
          ) : null}
        </ul>
      )}
    </div>
  );
};

export default todocomponent;
