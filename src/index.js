import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/main.css";
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";


import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);