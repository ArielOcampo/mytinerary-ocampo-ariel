import React from "react";
import { configureStore as createStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import "./index.css";
import mainReducer from "./redux/reducers/mainReducer";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const reduxStore = createStore({ reducer: mainReducer });
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={reduxStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
