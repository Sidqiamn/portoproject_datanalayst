import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom"; // ⬅️ TAMBAHKAN INI

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {" "}
      {/* ⬅️ BUNGKUS APP */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);

reportWebVitals();
