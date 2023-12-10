import { createStore } from "redux";

const ADD_TASK = "ADD_TASK";
const EDIT_TASK = "EDIT_TASK";
const DELETE_TASK = "DELETE_TASK";
const TOGGLE_TASK_STATUS = "TOGGLE_TASK_STATUS";

export const addTask = (payload) => ({ type: ADD_TASK, payload });
export const editTask = (index, payload) => ({
  type: EDIT_TASK,
  index,
  payload,
});
export const deleteTask = (index) => ({ type: DELETE_TASK, index });
export const toggleTaskStatus = (index) => ({
  type: TOGGLE_TASK_STATUS,
  index,
});

const todoReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TASK:
      return [...state, { text: action.payload, completed: false }];
    case EDIT_TASK:
      const updatedTasks = [...state];
      updatedTasks[action.index].text = action.payload;
      return updatedTasks;
    case DELETE_TASK:
      return state.filter((_, i) => i !== action.index);
    case TOGGLE_TASK_STATUS:
      const toggledTasks = [...state];
      toggledTasks[action.index].completed = !toggledTasks[action.index]
        .completed;
      return toggledTasks;
    default:
      return state;
  }
};

const store = createStore(todoReducer);

export default store;
