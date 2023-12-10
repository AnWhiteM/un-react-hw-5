import React, { useReducer, useState } from "react";
import "./TodoList.css";

const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, { text: action.payload, completed: false }];
    case "EDIT_TASK":
      const updatedTasks = [...state];
      updatedTasks[action.index].text = action.payload;
      return updatedTasks;
    case "DELETE_TASK":
      return state.filter((_, i) => i !== action.index);
    case "TOGGLE_TASK_STATUS":
      const toggledTasks = [...state];
      toggledTasks[action.index].completed = !toggledTasks[action.index]
        .completed;
      return toggledTasks;
    default:
      return state;
  }
};

const TodoList = () => {
  const [tasks, dispatch] = useReducer(todoReducer, []);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      dispatch({ type: "ADD_TASK", payload: newTask });
      setNewTask("");
    }
  };

  const editTask = (index, newText) => {
    dispatch({ type: "EDIT_TASK", index, payload: newText });
  };

  const deleteTask = (index) => {
    dispatch({ type: "DELETE_TASK", index });
  };

  const toggleTaskStatus = (index) => {
    dispatch({ type: "TOGGLE_TASK_STATUS", index });
  };

  return (
    <div className="todo-list-container">
      <h1 class="title">Todo List</h1>
      <div class="button-div">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          class="taskInput"
        />
        <button onClick={addTask} class="button">
          Add
        </button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? "completed" : ""}>
            <span>{task.text}</span>
            <div class="todo-buttons">
              <button
                onClick={() => editTask(index, prompt("Edit task:", task.text))}
              >
                Edit
              </button>
              <button onClick={() => deleteTask(index)} class="button">
                Delete
              </button>
              <button onClick={() => toggleTaskStatus(index)} class="button">
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
