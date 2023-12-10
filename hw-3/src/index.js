import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import TodoList from "./TodoList";
import store from "./redux";

const root = document.getElementById("root");
const reactRoot = createRoot(root);

reactRoot.render(
  <React.StrictMode>
    <Provider store={store}>
      <TodoList />
    </Provider>
  </React.StrictMode>
);
