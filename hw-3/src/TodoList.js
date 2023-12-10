import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask, deleteTask, toggleTaskStatus } from "./redux";
import "./TodoList.css";

const TodoList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state);
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      dispatch(addTask(newTask));
      setNewTask("");
    }
  };

  const handleEditTask = (index) => {
    const newText = prompt("Edit task:", tasks[index].text);
    if (newText !== null) {
      dispatch(editTask(index, newText));
    }
  };

  const handleDeleteTask = (index) => {
    dispatch(deleteTask(index));
  };

  const handleToggleTaskStatus = (index) => {
    dispatch(toggleTaskStatus(index));
  };

  return (
    <div className="todo-list-container">
      <h1 className="title">Todo List</h1>
      <div className="button-div">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className="taskInput"
        />
        <button onClick={handleAddTask} className="button">
          Add
        </button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? "completed" : ""}>
            <span>{task.text}</span>
            <div className="todo-buttons">
              <button onClick={() => handleEditTask(index)}>Edit</button>
              <button
                onClick={() => handleDeleteTask(index)}
                className="button"
              >
                Delete
              </button>
              <button
                onClick={() => handleToggleTaskStatus(index)}
                className="button"
              >
                {task.completed ? "Undo" : "Complete"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
