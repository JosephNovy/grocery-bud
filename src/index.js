import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

const containerroot = document.getElementById("root");
const root = createRoot(containerroot);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
